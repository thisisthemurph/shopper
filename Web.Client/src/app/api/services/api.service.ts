import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/auth/Auth';
import { AuthService } from 'src/app/auth/services/auth.service';

const defaultHttpHeaders = {
  'Content-Type': 'application/json',
};

const defaultHttpOptions = {
  headers: new HttpHeaders(defaultHttpHeaders),
};

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  public get<T>(path: string, authenticate = true): Observable<T> {
    // TODO: Validate the path
    const url = this.baseUrl + path;
    const options = this.buildHttpOptions(authenticate);

    return this.http.get<T>(url, options);
  }

  public post<T>(path: string, body: any): Observable<T> {
    const url = this.baseUrl + path; // TODO: Validate
    const options = this.buildHttpOptions(true);

    return this.http.post<T>(url, body, options);
  }

  private buildHttpOptions(authenticate: boolean) {
    if (!authenticate) {
      return defaultHttpOptions;
    }

    const token = Auth.getToken();

    if (token) {
      return {
        headers: new HttpHeaders({
          ...defaultHttpHeaders,
          Authorization: `bearer ${token}`,
        }),
      };
    }

    // There will be issues, authentication is required but
    // a token is not available for the request.
    console.warn(
      'A token is not available for this request, sending without token.'
    );
    return defaultHttpOptions;
  }
}
