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

interface Headers {
  headers: HttpHeaders;
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = 'https://localhost:7009/api/';
  constructor(private http: HttpClient, private authService: AuthService) {}

  public get<T>(path: string, authenticate = true): Observable<T> {
    // TODO: Validate the path
    const [url, options] = this.getStandardUrlAndOptions(path, authenticate);
    return this.http.get<T>(url, options);
  }

  public post<T>(path: string, body: any): Observable<T> {
    const [url, options] = this.getStandardUrlAndOptions(path);
    return this.http.post<T>(url, body, options);
  }

  public put<T>(path: string, body: any): Observable<T> {
    const [url, options] = this.getStandardUrlAndOptions(path);
    return this.http.put<T>(url, body, options);
  }

  public delete<T>(path: string): Observable<T> {
    const [url, options] = this.getStandardUrlAndOptions(path);
    return this.http.delete<T>(url, options);
  }

  private getStandardUrlAndOptions(
    path: string,
    authenticate = true
  ): [string, Headers] {
    return [this.baseUrl + path, this.buildHttpOptions(authenticate)];
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
