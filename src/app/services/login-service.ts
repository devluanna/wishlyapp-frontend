import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl: string = "http://localhost:8080/auth";

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string){
    return this.httpClient.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap((response) => {
        sessionStorage.setItem("auth-token", response.token);
        sessionStorage.setItem("userId", response.id_user.toString());
        console.log("token", response.token);
        console.log("id_user", response.id_user);
      })
    );
  }
}