import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Auth } from '../Auth';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

interface TokenRequestResponse {
  data: string;
}

interface UserDto {
  email: string;
}

interface UserRegisterDto extends UserDto {
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7009/api/Auth';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  public login(email: string, password: string): Observable<string> {
    return this.http
      .post<TokenRequestResponse>(
        `${this.baseUrl}/login`,
        { email, password },
        httpOptions
      )
      .pipe(map((response) => response.data));
  }

  public register(user: UserRegisterDto): Observable<UserDto> {
    const url = `${this.baseUrl}/register`;
    return this.http.post<UserDto>(url, user, httpOptions);
  }

  public requestPasswordReset(email: string): Observable<boolean> {
    const url = `${this.baseUrl}/RequestPasswordReset`;
    return this.http.post<boolean>(url, { email }, httpOptions).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  public resetPassword(
    token: string,
    newPassword: string
  ): Observable<boolean> {
    const url = `${this.baseUrl}/PasswordReset`;

    const passwordResetDto = {
      token: token,
      password: newPassword,
    };

    return this.http.post(url, passwordResetDto, httpOptions).pipe(
      map(() => {
        return true;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }

  /**
   * Indicates if the user's JWT has expired
   * @returns true if expired, otherwise false
   */
  public isAuthenticated(): boolean {
    const token = Auth.getToken();

    if (!token) {
      return false;
    }

    return !this.jwtHelper.isTokenExpired(token);
  }
}
