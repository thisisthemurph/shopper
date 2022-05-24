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
  public static getToken(includeBearer = false): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);

    if (!token) return null;

    if (includeBearer) {
      return token;
    }

    const [bearer, secret] = token.split(' ', 1);

    // If this isn't the string 'bearer' somthing is strange
    if (bearer.toLowerCase() !== 'bearer') {
      return null;
    }

    return secret;
  }
}
