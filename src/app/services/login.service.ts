import { JsonPipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  

  constructor(private http:HttpClient) { }

  public generateToken(LoginData:any){
    localStorage.clear();
    
    let token=this.http.post(`${baseUrl}/token-generation`,LoginData);
    console.log("*****generateToken*****"+token);

    return token;
    
  }
  public getCurrentUser(){
    console.log("getUser");

    return this.http.get(`${baseUrl}/current-user`);
    
  }
  public loginUser(token: any){
    localStorage.setItem("token",token);
    return true;
  }

  public isLoggedIn(){
    let tokkenStr=localStorage.getItem("token");
    if(tokkenStr==undefined||tokkenStr==""||tokkenStr==null){
      return false
    }
    else{
      return true
    }
  }
  public Logout(){
    localStorage.clear();
    return true;
  }

  public getToken(){
    return localStorage.getItem('token')
  }

  public setUserDetails(user:any){
      localStorage.setItem('user',JSON.stringify(user))
  }

  public getUser(){
    let userStr=localStorage.getItem("user");
    if(userStr!=null){
      return JSON.parse(userStr)
    }
    else{
      this.Logout();
      return false;
    }
  }

  public getUserRole(){
    let user=this.getUser();
    return user.authorities[0].authority;
  }
}
