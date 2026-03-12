import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';

import { LoginResponse, RegisterResponse } from '../interfaces/IAuth';
import { IUser } from '../interfaces/IUser';
import { IUserCreate } from '../interfaces/IUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  private baseUrl =
    'https://saas-lms-backend-fastapi-postgresql-production.up.railway.app';

  private tokenState = signal<string | null>(localStorage.getItem('token'));

  token = computed(() => this.tokenState());
  isLoggedIn = computed(() => !!this.tokenState());

  login(usuarioLog: { email: string; password: string }) {
    return firstValueFrom(
      this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, usuarioLog)
    );
  }

  register(data: IUserCreate) {
    return firstValueFrom(
      this.http.post<RegisterResponse>(`${this.baseUrl}/auth/register`, data)
    );
  }

  getMe() {
    return firstValueFrom(
      this.http.get<IUser>(`${this.baseUrl}/users/me`)
    );
  }

  setSession(token: string): void {
    localStorage.setItem('token', token);
    this.tokenState.set(token);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.tokenState.set(null);
  }
}