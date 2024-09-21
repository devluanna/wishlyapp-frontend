import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl: string = "http://localhost:8080/user/u/";
  getUserById: any;

  constructor(private httpClient: HttpClient) { }

  getUserInfo(userId: string) {
    return this.httpClient.get<any>(`${this.apiUrl}${userId}`).pipe(
     
    );
  }
}