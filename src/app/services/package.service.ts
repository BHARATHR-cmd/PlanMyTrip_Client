import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  constructor(private http:HttpClient) { }

  public getPackage(pid:any){
    return this.http.get(`${baseUrl}/package/${pid}`)
  }
  public getPackages(){
    return this.http.get(`${baseUrl}/package/`);
  }

  public addPackage(packagee:any){
    return this.http.post(`${baseUrl}/package/`,packagee);
  }
  public updatePackage(packagee:any){
    return this.http.put(`${baseUrl}/package/`,packagee);
  }

  public deletePackage(pid:any){
    return this.http.delete(`${baseUrl}/package/${pid}`)
  }
}
