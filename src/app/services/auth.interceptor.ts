import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { request } from "http";
import { Observable, tap } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private Login:LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("inside")

        const token =localStorage.getItem('token');
        console.log(token)
        return next.handle(req.clone({
            setHeaders:{'Access-Control-Allow-Origin':'*',
            'Authorization':`Bearer ${token}`,}
        }),);


    }
}
  export const authInterceptorProviders=[{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true,
  }]