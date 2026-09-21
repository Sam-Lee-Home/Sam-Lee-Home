/**
 * User information returned by the Auth Service
 */
export class User {
  constructor(
    public username: string,
    public email: string,
    public isAuthenticated: boolean
  ) {}
}

/**
 * AuthProvider Base Class
 * Defines the contract that both Mock and AWS Amplify providers must follow.
 */
export class AuthProvider {
  async signIn(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> { throw new Error('Not implemented'); }
  async signUp(username: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> { throw new Error('Not implemented'); }
  async confirmSignUp(username: string, confirmationCode: string): Promise<{ success: boolean; error?: string }> { throw new Error('Not implemented'); }
  async signOut(): Promise<void> { throw new Error('Not implemented'); }
  async getCurrentUser(): Promise<User | null> { throw new Error('Not implemented'); }
}

/**
 * AuthService
 * The primary entry point for the application to interact with authentication.
 * This class delegates work to the configured provider.
 */
export class AuthService {
  private provider: AuthProvider;

  constructor(provider: AuthProvider) {
    this.provider = provider;
  }

  async signIn(username: string, password: string) {
    return this.provider.signIn(username, password);
  }

  async signUp(username: string, email: string, password: string) {
    return this.provider.signUp(username, email, password);
  }

  async confirmSignUp(username: string, confirmationCode: string) {
    return this.provider.confirmSignUp(username, confirmationCode);
  }

  async signOut() {
    return this.provider.signOut();
  }

  async getCurrentUser() {
    return this.provider.getCurrentUser();
  }
}