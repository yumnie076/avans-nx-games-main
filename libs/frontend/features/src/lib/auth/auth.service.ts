import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUserCredentials } from '@avans-nx-workshop/shared/api';
import { IUserIdentity } from '@avans-nx-workshop/shared/api';
import { environment } from '../../../../../../libs/shared/util-env/src/lib/environment';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.dataApiUrl}/auth`; 

  constructor(private http: HttpClient) { }

  login(credentials: IUserCredentials): Observable<IUserIdentity> {
    return this.http.post<IUserIdentity>(`${this.apiUrl}/login`, credentials);
  }

  register(user: IUserCredentials): Observable<IUserIdentity> {
    return this.http.post<IUserIdentity>(`${this.apiUrl}/register`, user);
  }


  loginUser(user: IUserIdentity): void {
    localStorage.setItem('token', user.token ?? '');

    localStorage.setItem('userId', user._id);
    localStorage.setItem('user', JSON.stringify(user));
  }

  logout(): void {
    localStorage.clear();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
