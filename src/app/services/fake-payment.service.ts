import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { fakePaymentInfo } from '../models/fakePaymentInfo';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class FakePaymentService {
  apiUrl='https://localhost:44311/api/'
  constructor(private httpClient:HttpClient) { }

  getPayment(fakePaymentInfo:fakePaymentInfo):Observable<ResponseModel>{
    let newPath=this.apiUrl + 'Payment/getpayment';
    return this.httpClient.post<ResponseModel>(newPath,fakePaymentInfo);
  }
}
