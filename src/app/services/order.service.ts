import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }



  public addOrder(order:any){
    this.http.post(`${baseUrl}/order/`,order)
  }

}
