import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post('/api/auth/login', { username, password })
      .pipe(tap((res: any) => localStorage.setItem('token', res.token)));
  }

  register(username: string, password: string) {
    return this.http.post('/api/auth/register', { username, password });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
