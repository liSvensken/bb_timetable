import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizationRequest } from '@common/interfaces/api/authorization-request.interface';
import { AuthorizationResponse } from '@common/interfaces/api/authorization-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient) {
  }

  login(model: AuthorizationRequest): Observable<AuthorizationResponse> {
    return this.http.post<any>('http://127.0.0.1:3000/users/auth', model);
  }
}
