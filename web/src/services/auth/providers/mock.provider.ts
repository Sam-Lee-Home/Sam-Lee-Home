import { AuthProvider, User } from '../auth.service';

/**
 * MockAuthProvider
 * Simulates Cognito authentication using localStorage.
 */
export class MockAuthProvider implements AuthProvider {
  private readonly USERS_KEY = 'mock_auth_users';
  private readonly SESSION_KEY = 'mock_auth_session';

  async signIn(username: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const users = this.getUsers();
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) {
      return { success: false, error: 'Invalid username or password' };
    }

    const authUser: User = { 
      username: user.username, 
      email: user.email, 
      isAuthenticated: true 
    };
    
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(authUser));
    return { success: true, user: authUser };
  }

  async signUp(username: string, email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
    const users = this.getUsers();

    if (users.find(u => u.username === username)) {
      return { success: false, error: 'Username already exists' };
    }

    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

    const authUser: User = { 
      username, 
      email, 
      isAuthenticated: true 
    };

    localStorage.setItem(this.SESSION_KEY, JSON.stringify(authUser));
    return { success: true, user: authUser };
  }

  async signOut(): Promise<void> {
    localStorage.removeItem(this.SESSION_KEY);
  }

  async getCurrentUser(): Promise<User | null> {
    const session = localStorage.getItem(this.SESSION_KEY);
    if (!session) return null;
    
    try {
      return JSON.parse(session) as User;
    } catch (e) {
      return null;
    }
  }

  private getUsers(): { username: string; email: string; password: string }[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }
}