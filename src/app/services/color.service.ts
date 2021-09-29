import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Color } from '../models/color';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class ColorService {
  apiUrl= 'https://localhost:44311/api/'

  constructor(private httpClient: HttpClient) { }

  add(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Colors/add",color)
  }

  update(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Colors/update",color)
  }

  delete(color:Color):Observable<ResponseModel>{
    return this.httpClient.post<ResponseModel>(this.apiUrl+"Colors/delete",color)
  }

  getColors():Observable<ListResponseModel<Color>>{
    let newPath=this.apiUrl + 'Colors/getall';
    return this.httpClient.get<ListResponseModel<Color>>(newPath)
  }

  getColorById(colorId:number):Observable<SingleResponseModel<Color>>{
    let newPath=this.apiUrl + 'Colors/getbyid?id=' + colorId ;
    return this.httpClient.get<SingleResponseModel<Color>>(newPath);
  }

}

