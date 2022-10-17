import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http:HttpClient) { }



  public addType(type:any){
    this.http.post(`${baseUrl}/type/`,type)
  }
}
