export abstract class Auth {
  private static TOKEN_KEY = 'token';

  constructor() {}

  public static storeToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Returns the token from local storage
   * @param includeBearer determine if the 'bearer' string is to be retained at the beginning of the token
   * @returns the token or null if no token is available
   */
  public static getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
