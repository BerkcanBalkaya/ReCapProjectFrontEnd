import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { RegisterModel } from '../models/registerModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'https://localhost:44311/api/';

  constructor(
    private httpClient: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  login(loginModel: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    let apiUrl = this.apiUrl + 'auth/login';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(
      apiUrl,
      loginModel
    );
  }
  register(
    registerModel: RegisterModel
  ): Observable<SingleResponseModel<TokenModel>> {
    let apiUrl = this.apiUrl + 'auth/register';
    return this.httpClient.post<SingleResponseModel<TokenModel>>(apiUrl,registerModel
    );
  }

  isAuthenticated() {
    if (this.localStorageService.get('token')) {
      return true;
    } else {
      return false;
    }
  }
}
