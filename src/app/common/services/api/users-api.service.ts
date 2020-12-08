import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegLoginRequestInterface } from '@common/interfaces/api/reg-login-request.interface';
import { RegLoginResponseInterface } from '@common/interfaces/api/reg-login-response.interface';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  constructor(private http: HttpClient) {
  }

  registrationUser(model: RegLoginRequestInterface): Observable<RegLoginResponseInterface> {
    return this.http.post<any>('http://127.0.0.1:3000/users/create', model);
  }

  getUser(): Observable<any> {
    return this.http.get<any>('http://127.0.0.1:3000/users/1');
  }
}
