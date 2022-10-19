import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  constructor(private http:HttpClient) { }

  public  getTypes(){
    return this.http.get(`${baseUrl}/type/`)
  }

  public addType(type:any){
    return this.http.post(`${baseUrl}/type/`,type)
  }
}
