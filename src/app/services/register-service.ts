import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  apiUrl: string = "http://localhost:8080/api/user";

  constructor(private httpClient: HttpClient) { }

  register(first_name: string, last_name: string, email: string, username:string, gender:string, dateBirthday:string, password: string, confirmPassword:string){
    return this.httpClient.post<any>(`${this.apiUrl}/register`, { first_name, last_name, email, username, gender, dateBirthday, password, confirmPassword }).pipe(
      tap((response) => {
        console.log("Request made successfully!");
      })
    );
  }
}