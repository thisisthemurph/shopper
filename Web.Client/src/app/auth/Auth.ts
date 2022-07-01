export abstract class Auth {
  private static TOKEN_KEY = 'token';

  constructor() {}

  /**
   * Stores the token in local storage
   * @param token the token to be stored
   */
  public static storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Returns the token from local storage
   * @returns the token or null if no token is available
   */
  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Removes the token from local storage
   */
  public static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }
}
