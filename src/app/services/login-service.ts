import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { LoginUser } from '../models/login-user.mode';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}

  login(user: LoginUser): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/login`, user).pipe(
      tap((response) => {
        sessionStorage.setItem("auth-token", response.token);
        sessionStorage.setItem("userId", response.id_user.toString());
        console.log("Login successful. Token:", response.token);
        console.log("User ID:", response.id_user);
      })
    );
  }
}
