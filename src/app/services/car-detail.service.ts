import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/carDetail';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { SanitizerService } from './sanitizer.service';

@Injectable({
  providedIn: 'root',
})
export class CarDetailService {

  apiUrl = 'https://localhost:44311/api/';
  constructor(private httpClient: HttpClient) {}


  getTopTenMostRentedCars() : Observable<ListResponseModel<CarDetail>>
  {
    let newPath = this.apiUrl+ 'Cars/gettoptenmostrentedcars' 
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetails(): Observable<ListResponseModel<CarDetail>> {
    let newPath = this.apiUrl+ 'Cars/getcardetails' 
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByCarId(carId:number):Observable<SingleResponseModel<CarDetail>>{
    let newPath = this.apiUrl+ 'Cars/getcardetailsbycarid?carId='+ carId;
    return this.httpClient.get<SingleResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByBrandId(brandId:number): Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+ 'Cars/getcardetailsbybrandid?brandId='+ brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }
  
  getCarDetailsByColorId(colorId:number): Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+ 'Cars/getcardetailsbycolorid?colorId='+ colorId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  getCarDetailsByColorAndBrandId(colorId:number,brandId:number): Observable<ListResponseModel<CarDetail>>{
    let newPath = this.apiUrl+ 'Cars/getcardetailsbycolorandbrandid?colorId='+colorId+'&brandId='+ brandId;
    return this.httpClient.get<ListResponseModel<CarDetail>>(newPath);
  }

  
  
}
