import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {BehaviorSubject, Observable, throwError} from "rxjs";
import {catchError, filter, switchMap, take} from "rxjs/operators";
import {AuthService} from "./auth.service";
import {Injectable} from "@angular/core";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(public authService: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (localStorage.getItem("access-token") && request.url !== 'http://194.67.104.19:4800/auth/refresh') {
      // @ts-ignore
      request = this.addToken(request, localStorage.getItem("access-token"));
    }

    return next.handle(request)
      .pipe(catchError(error => {
        if (error instanceof HttpErrorResponse && error.status === 401 && !request.url.includes('/login')) {
          //console.log('if worked')
          return this.handle401Error(request, next);
        } else {
          return throwError(error);
        }
      }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        'Authorization': 'Bearer '+`${token}`
      }
    });
  }


  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  // Handle 401 error
  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    //console.log('[handle401Error] 1')
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      //console.log('[handle401Error] 2')
      return this.authService.getNewTokens().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token.access_token);
          return next.handle(this.addToken(request, token.access_token));
        }));

    } else {
      //console.log('[handle401Error] 3')
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwt => {
          //console.log('[handle401Error] 4')
          //console.log(jwt);
          return next.handle(this.addToken(request, jwt));
        }));
    }
  }
}
