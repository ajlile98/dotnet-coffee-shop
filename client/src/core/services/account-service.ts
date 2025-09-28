import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { LoginCreds, RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  private baseUrl = environment.apiUrl;

  register(creds: RegisterCreds) {
    return this.http
      .post<User>(this.baseUrl + 'account/register', creds, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          if (user) {
            this.setCurrentUser(user);
            this.startTokenRefreshInterval();
          }
        })
      );
  }

  login(creds: LoginCreds) {
    return this.http
      .post<User>(this.baseUrl + 'account/login', creds, {
        withCredentials: true,
      })
      .pipe(
        tap((user) => {
          if (user) {
            this.setCurrentUser(user);
            this.startTokenRefreshInterval();
          }
        })
      );
  }

  refreshToken() {
    return this.http.post<User>(
      this.baseUrl + 'account/refresh-token',
      {},
      { withCredentials: true }
    );
  }

  startTokenRefreshInterval() {
    setInterval(() => {
      this.http
        .post<User>(
          this.baseUrl + 'account/refresh-token',
          {},
          { withCredentials: true }
        )
        .subscribe({
          next: (user) => {
            this.setCurrentUser(user);
          },
          error: () => {
            this.logout();
          }
        });
    }, 5 * 60 * 1000); // 5 minutes
  }

  setCurrentUser(user: User) {
    this.currentUser.set(user);
  }

  logout() {
    this.http.post(this.baseUrl + 'account/logout', {}, {withCredentials: true}).subscribe({
      next: () => {
        localStorage.removeItem('user');
        this.currentUser.set(null);
        localStorage.removeItem('bag');
      }
    });
  }
}
