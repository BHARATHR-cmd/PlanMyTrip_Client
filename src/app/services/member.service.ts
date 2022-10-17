import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http:HttpClient) { }



  public addMember(member:any){
    this.http.post(`${baseUrl}/member/`,member)
  }
}
