import { AuthProvider, User } from '../auth.service';
import { signIn, signUp, signOut, getCurrentUser, confirmSignUp } from 'aws-amplify/auth';

// Avoiding naming conflict between the function getCurrentUser and the method getCurrentUser
const amplifyGetCurrentUser = getCurrentUser;
const amplifyConfirmSignUp = confirmSignUp;

/**
 * AmplifyAuthProvider
 * Real implementation using AWS Amplify v6 functional API
 */
export class AmplifyAuthProvider implements AuthProvider {
  async signIn(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      const { isSignedIn, nextStep } = await signIn({ username, password });
      
      if (isSignedIn) {
        const user = await this.getCurrentUser();
        return { success: true, user: user ?? undefined };
      }

      const nextStepMessage = typeof nextStep === 'string' ? nextStep : JSON.stringify(nextStep);
      return { success: false, error: `Next step required: ${nextStepMessage}` };
    } catch (error: any) {
      console.error('AWS Cognito SignIn Error Detailed:', error);
      return { success: false, error: error.message || 'Sign in failed' };
    }
  }

  async signUp(username: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    try {
      await signUp({
        username,
        password,
        options: { userAttributes: { email } }
      });
      
      return { 
        success: true, 
        user: new User(username, email, false) 
      };
    } catch (error: any) {
      console.error('AWS Cognito SignUp Error Detailed:', error);
      return { success: false, error: error.message || 'Sign up failed' };
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out failed', error);
    }
  }

  async getCurrentUser(): Promise<User | null> {
    try {
      const { username } = await amplifyGetCurrentUser();
      return new User(username, '', true);
    } catch (error) {
      return null;
    }
  }

  async confirmSignUp(username: string, confirmationCode: string): Promise<{ success: boolean; error?: string }> {
    try {
      await amplifyConfirmSignUp({
        username,
        confirmationCode
      });
      return { success: true };
    } catch (error: any) {
      console.error('AWS Cognito ConfirmSignUp Error Detailed:', error);
      return { success: false, error: error.message || 'Confirmation failed' };
    }
  }
}