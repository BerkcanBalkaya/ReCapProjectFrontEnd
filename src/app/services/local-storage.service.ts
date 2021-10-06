import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }
  
  add(key: string, value: any) {
    localStorage.setItem(key, value);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  clear() {
    localStorage.clear();
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  getUserDetails(){
    return JSON.parse(localStorage.getItem("userDetails"));
  }

  setUserDetails(userModel:User){
    localStorage.setItem("userDetails",JSON.stringify(userModel))
  }
}
