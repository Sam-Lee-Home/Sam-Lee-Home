import { AuthService } from './auth.service';
import { AmplifyAuthProvider } from './providers/amplify.provider';
import { Amplify } from 'aws-amplify';

/**
 * Cognito Configuration
 */
Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.PUBLIC_COGNITO_USER_POOL_ID,
      userPoolClientId: import.meta.env.PUBLIC_COGNITO_CLIENT_ID,
    }
  }
});

// Log configuration to verify they are actually loaded from .env
console.log('Cognito Config:', {
  userPoolId: import.meta.env.PUBLIC_COGNITO_USER_POOL_ID,
  userPoolClientId: import.meta.env.PUBLIC_COGNITO_CLIENT_ID
});

/**
 * Initialize the global auth service.
 * Now configured with AmplifyAuthProvider for Phase 3.
 */
const provider = new AmplifyAuthProvider();
export const authService = new AuthService(provider);