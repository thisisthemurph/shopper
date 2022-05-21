export abstract class Auth {
  private static TOKEN_KEY = 'token';

  constructor() {}

  public static storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
