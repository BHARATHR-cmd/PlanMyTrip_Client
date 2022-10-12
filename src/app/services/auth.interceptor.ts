import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { LoginService } from "./login.service";


@Injectable()

export class AuthInterceptor implements HttpInterceptor{

    constructor(private Login:LoginService){

    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("inside")

        let authReq=req;
        const token = this.Login.getToken();
        if(token!=null){
            authReq=authReq.clone({
                setHeaders:{'Authorization':`Bearer ${token}`},
            });
        }
        console.log(authReq.headers)
        return next.handle(authReq);


    }
}
  export const authInterceptorProviders=[{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true,
  }]