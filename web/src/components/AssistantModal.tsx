import React from 'react';
import { 
  AssistantRuntimeProvider, 
  AssistantModalPrimitive,
  useLocalRuntime
} from '@assistant-ui/react';
import { BotIcon, RotateCcw } from 'lucide-react';

/**
 * A minimal functional Thread implementation.
 */
const MESSAGES_STORAGE_KEY = 'assistant_ui_messages';

const Thread = ({ onSendMessage }: { onSendMessage: (msg: string) => Promise<any> }) => {
  const [input, setInput] = React.useState('');
  const [messages, setMessages] = React.useState<any[]>(() => {
    // Initialize from localStorage to persist history across page transitions
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  const [isLoading, setIsLoading] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  // Sync messages to localStorage whenever they change
  React.useEffect(() => {
    localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  React.useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleReset = () => {
    // Clear the local message history and localStorage
    setMessages([]);
    localStorage.removeItem(MESSAGES_STORAGE_KEY);
    
    // Generate a new session ID to reset Bedrock Harness memory
    const SESSION_STORAGE_KEY = 'assistant_ui_session_id';
    const newId = crypto.randomUUID();
    localStorage.setItem(SESSION_STORAGE_KEY, newId);
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage = input;
    setInput('');
    
    // Optimistically add user message to local state
    setMessages(prev => [...prev, { content: userMessage, role: 'user' }]);
    setIsLoading(true);
    
    try {
      const response = await onSendMessage(userMessage);
      
      // Add the assistant response to local state
      setMessages(prev => [...prev, response]);
    } catch (e) {
      console.error('Failed to send message:', e);
      setMessages(prev => [...prev, { content: 'Error: Could not reach the assistant.', role: 'assistant' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full w-full p-4 bg-white text-black">
      <div className="flex-1 overflow-y-auto space-y-4 text-sm">
        {messages.length === 0 ? (
          <div className="text-gray-500 text-center italic">
            AI Assistant is ready to help you.
          </div>
        ) : (
          <>
            {messages.map((msg: any, i: number) => (
              <div key={i} className={`p-2 rounded-lg ${msg.role === 'user' ? 'bg-gray-100 ml-8 text-right' : 'bg-blue-50 mr-8'}`}>
                <span className="font-bold block text-xs mb-1">
                  {msg.role === 'user' ? 'You' : 'Assistant'}
                </span>
                {msg.content}
              </div>
            ))}
            {isLoading && (
              <div className="p-2 rounded-lg bg-blue-50 mr-8 italic text-gray-500 animate-pulse">
                <span className="font-bold block text-xs mb-1 not-italic text-gray-600">Assistant</span>
                Thinking...
              </div>
            )}
            <div ref={scrollRef} />
          </>
        )}
      </div>
      <div className="mt-4 flex gap-2 items-center">
        <button 
          onClick={handleReset}
          title="New Conversation"
          className="p-2 text-gray-400 hover:text-brand-primary transition-colors duration-150"
        >
          <RotateCcw size={18} />
        </button>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask something..." 
          className="flex-1 px-3 py-2 border-none bg-gray-50 rounded-md text-sm outline-none focus:ring-2 focus:ring-brand-primary"
        />
        <button 
          onClick={handleSend}
          className="px-3 py-2 bg-brand-primary text-white rounded-md text-sm font-medium"
        >
          Send
        </button>
      </div>
    </div>
  );
};

const USE_MOCK = false; // Toggle this to false to connect to the real AWS Lambda backend

/**
 * Manages the session ID for AWS Bedrock Agentcore Harness Memory.
 * Ensures the same session ID is used across page refreshes.
 */
const getOrCreateSessionId = () => {
  const STORAGE_KEY = 'assistant_ui_session_id';
  let sessionId = localStorage.getItem(STORAGE_KEY);
  
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(STORAGE_KEY, sessionId);
  }
  
  return sessionId;
};

export default function AssistantModal() {
  // Using 'as any' to bypass strict ChatModelAdapter interface checks and unblock UI integration
  const runtime = useLocalRuntime({
    generate: async ({ messages }: { messages: any[] }) => {
      const lastMessage = messages[messages.length - 1]?.content;
      
      if (USE_MOCK) {
        console.log('Mock mode active. Simulated response for:', lastMessage);
        return {
          content: "This is a simple static mock response. The UI is working correctly! (Switch USE_MOCK to false to connect to the real Lambda backend)",
          role: 'assistant',
        };
      }

      console.log('Sending message to backend:', lastMessage);
      try {
        const response = await fetch(import.meta.env.PUBLIC_ASSISTANT_URL || '/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            message: lastMessage,
            history: messages 
          }),
        });
        
        if (!response.ok) throw new Error('Backend request failed');
        
        const data = await response.json();
        // assistant-ui expects the adapter to return a message object or a stream
        return {
          content: data.message || data.content || 'No response from assistant',
          role: 'assistant',
        };
      } catch (e) {
        console.error('Runtime error:', e);
        return {
          content: 'Error: Failed to connect to the assistant. Please check the backend.',
          role: 'assistant',
        };
      }
    },
  } as any);

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <AssistantModalPrimitive.Root>
        <AssistantModalPrimitive.Anchor className="fixed right-4 top-24 size-11 z-50">
          <AssistantModalPrimitive.Trigger asChild>
            <button className="size-full rounded-full bg-brand-primary text-white shadow-lg transition-transform duration-150 ease-out hover:scale-105 active:scale-96 flex items-center justify-center">
              <BotIcon size={24} />
            </button>
          </AssistantModalPrimitive.Trigger>
        </AssistantModalPrimitive.Anchor>

        <AssistantModalPrimitive.Content
          sideOffset={16}
          className="h-[500px] w-[400px] rounded-[2rem] bg-white shadow-xl overflow-hidden border-none"
        >
          <Thread 
            onSendMessage={async (msg) => {
              // This calls the logic defined in the runtime's generate method
              // We manually trigger the logic here to ensure it's called correctly
              if (USE_MOCK) {
                const sessionId = getOrCreateSessionId();
                return {
                  content: `Mock Response [Session: ${sessionId}]: I received your message: "${msg}". The UI is working correctly and is now sending the Session ID for Harness Memory! (Switch USE_MOCK to false to connect to the real Lambda backend)`,
                  role: 'assistant',
                };
              }
              
              try {
                const sessionId = getOrCreateSessionId();
                const response = await fetch(import.meta.env.PUBLIC_ASSISTANT_URL || '/api/chat', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ 
                    sessionId: sessionId,
                    message: msg 
                  }),
                });
                if (!response.ok) throw new Error('Backend request failed');
                const data = await response.json();
                return {
                  content: data.message || data.content || 'No response from assistant',
                  role: 'assistant',
                };
              } catch (e) {
                throw e;
              }
            }} 
          />
        </AssistantModalPrimitive.Content>
      </AssistantModalPrimitive.Root>
    </AssistantRuntimeProvider>
  );
}
