import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { RegisterUserModel } from '../models/register-user.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  register(user: RegisterUserModel): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/auth/register`, user).pipe(
      tap(() => {
        console.log("Request made successfully!");
      })
    );
  }
}