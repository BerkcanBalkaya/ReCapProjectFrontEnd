import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../models/brand';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root',
})
export class BrandService {

  apiUrl = 'https://localhost:44311/api/';

  constructor(private httpClient: HttpClient) {}
  
  add(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Brands/add",brand)
  }
  update(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Brands/update",brand)
  }
  delete(brand:Brand):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Brands/delete",brand)
  }

  getBrands(): Observable<ListResponseModel<Brand>> {
    let newPath = this.apiUrl+ 'Brands/getall'
    return this.httpClient.get<ListResponseModel<Brand>>(newPath);
  }

  getBrandById(brandId:number):Observable<SingleResponseModel<Brand>>{
    let newPath = this.apiUrl+ 'Brands/getbyid?id='+brandId;
    return this.httpClient.get<SingleResponseModel<Brand>>(newPath);
  }
}
