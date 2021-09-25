import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalService {
  apiUrl= 'https://localhost:44311/api/'
  constructor(private httpClient: HttpClient) { }

  getColorsById(rentalId:number):Observable<ListResponseModel<Rental>>{
    let newPath=this.apiUrl + 'Colors/getbyid?id=' + rentalId ;
    return this.httpClient.get<ListResponseModel<Rental>>(newPath);
  }
}
