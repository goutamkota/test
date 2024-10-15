import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn : 'root'
})
export class AuthInterceptor implements HttpInterceptor {
  intercept(req : any, next : any) : Observable<any> {
    let clientId = sessionStorage.getItem('clientId');
    let Client_Secret = sessionStorage.getItem('clientSecret');
    console.log(clientId,Client_Secret, "llsh")
    let apiusername = sessionStorage.getItem('apiusername');
    if (!req.url.includes('getlogintoken.json')) {
      if (req.url.endsWith('isu_bank/_search') || req.url.endsWith('isu_elastic_user/_search')) {
        req = req.clone({
          setHeaders : {
            Authorization : `Basic ZWxhc3RpYzpUQWhJamJ4U2RzRzRRRDY3WWVmZTZQdzg=`
          }
        });
      } else if (req.url.startsWith('https://authtest-prod.iserveu.tech/auth_test')) {
        req = req.clone({
          setHeaders : {
            Client_id : clientId,
            Client_Secret : Client_Secret,
            apiusername : apiusername
          }
        });
      } else if (req.url.startsWith('https://apidev.iserveu.online/auth_test')) {
        req = req.clone({
          setHeaders : {
            Client_id : clientId,
            Client_Secret : Client_Secret,
            apiusername : apiusername
          }
        });
      } else if (req.url.startsWith('https://authtest.iserveu.online/auth_test')) {
        req = req.clone({
          setHeaders : {
            Client_id : clientId,
            Client_Secret : Client_Secret,
            apiusername : apiusername
          }
        });
      } else if (req.url.startsWith('https://apidev-sdk.iserveu.online/staging/mATMV2')) {
        req = req.clone({
          setHeaders : {
            Client_id : clientId,
            Client_Secret : Client_Secret,
            UserSourceAgent : 'ANDROIDSDK'
          }
        });
      } else {
        req = req.clone({
          setHeaders : {
            Client_id : clientId,
            Client_Secret : Client_Secret,
            UserSourceAgent : 'ANDROIDSDK'
          }
        });
      }
    }
    return next.handle(req);
  }
}
