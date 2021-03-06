import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl= 'https://localhost:44311/api/'
  constructor(private httpClient: HttpClient) { }

  getUserByMail(mail:string): Observable<SingleResponseModel<User>> {
    let newPath=this.apiUrl + 'Users/getbymail?mail=' + mail;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }
}
