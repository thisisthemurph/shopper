import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

interface TokenRequestResponse {
  data: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'https://localhost:7009/api/Auth';

  constructor(private http: HttpClient) {}

  public login(email: string, password: string): Observable<string> {
    return this.http
      .post<TokenRequestResponse>(
        `${this.baseUrl}/login`,
        { email, password },
        httpOptions
      )
      .pipe(map((response) => response.data));
  }
}
