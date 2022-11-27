import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import {catchError, mapTo, Observable, of, tap, throwError} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = {
    check: 'http://' + environment.DB_EXTERNAL_IP + ':' + environment.AUTH_PORT + '/auth/login',
    addUser: 'http://' + environment.DB_EXTERNAL_IP + ':' + environment.AUTH_PORT + '/auth/register',
    refreshTokens: 'http://' + environment.DB_EXTERNAL_IP + ':' + environment.AUTH_PORT + '/auth/refresh',


  }

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) { }

  //Вход по логину и паролю
  login(user: { login: string, password: string }): Observable<boolean> {
    let url = this.apiUrl.check + '?login=' + user?.login + '&' + 'password=' + user?.password;
    //console.log(url);
    return this.httpClient.get<any>(url)
      .pipe(
        tap(tokens => {
          console.log(tokens);
          localStorage.setItem("access-token", tokens.access_token);
          localStorage.setItem("refresh-token", tokens.refresh_token);
        }),
        mapTo(true),
        catchError(
          error => {
            return of(false);
          }
        )
      )
  }


  //Добавление пользователя при регистрации
  addUser(newUser: { login: string, password: string }): Observable<any> {
    console.log(newUser)
    return this.httpClient.post<any>(this.apiUrl.addUser, newUser)
      .pipe(
        tap(tokens => {
          console.log(tokens)
          this.router.navigateByUrl("/auth/login");
        }),
        catchError(this.handleError));
  }

  //Получение новых токенов
  getNewTokens(): Observable<any> {
    let objToSend = {
      refresh_token: localStorage.getItem("refresh-token")
    }
    //console.log("[getNewTokens] refreshing tokens");
    //console.log(objToSend);
    // Добавление refresh_token в HttpHeaders
    let httpHeaders: HttpHeaders = new HttpHeaders({'Authorization': ('Bearer ' + objToSend.refresh_token)});
    let options = {headers: httpHeaders};
    //console.log(httpHeaders);
    //console.log("[getNewTokens] before crash");
    return this.httpClient.put(this.apiUrl.refreshTokens, objToSend, options)
      .pipe(tap(tokens => {
          console.log(tokens);
          // @ts-ignore
          localStorage.setItem("access-token", tokens.access_token);
          // @ts-ignore
          localStorage.setItem("refresh-token", tokens.refresh_token);
        }),
        catchError(this.handleErrorTokens))
  }

  //Обработка ошибок
  private handleError(errorResponse: HttpErrorResponse) {
    console.log(errorResponse);
    if (errorResponse.status === 500) {
      alert('Либо запрос неверный, либо база спит, либо просто херня какая-то. Попробуй перечитать документацию')
    }
    if (errorResponse.status === 401) {
      console.log("401 error")
    }
    if (errorResponse.status === 404) {
      //UserTokens.deleteTokens();
    }
    return throwError(errorResponse);
  }

  //Обработчик ошибок для получения токенов
  private handleErrorTokens(errorResponse: HttpErrorResponse) {
    console.log('Error while new tokens error' + errorResponse.status);
    if (errorResponse.status === 404) {
      localStorage.clear();
    }
    return throwError(errorResponse);
  }
}