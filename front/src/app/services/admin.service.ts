import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, mapTo} from 'rxjs';
import {environment} from '../../environments/environment';

export interface user {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = {
    // Получение списка аккаунтов
    getUsers: environment.PROTOCOL + '://' + environment.DB_EXTERNAL_IP + ':' + environment.AUTH_PORT + '/admin-panel',
  }

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getUsers(): Observable<user[]> {
    let options = {
      headers: new HttpHeaders()
        .set('Authorization', "Bearer " + localStorage.getItem('access-token') || 'ТОКЕН ПРОЕБАН ГДЕ-ТО')
    }

    return this.httpClient.get<user[]>(this.apiUrl.getUsers, options)

  }

}
