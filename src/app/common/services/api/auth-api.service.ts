import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthorizationRequest } from '@common/interfaces/api/authorization-request.interface';
import { AuthorizationResponse } from '@common/interfaces/api/authorization-response.interface';
import { RegistrationRequestInterface } from '@common/interfaces/api/registration-request.interface';
import { RegistrationResponse } from '@common/interfaces/api/registration-response.interface';
import { ApiService } from '@common/services/api/api.service';
import { GetUserResponse } from '@common/interfaces/api/get-user-response.interface';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  constructor(private http: HttpClient,
              private apiService: ApiService) {
  }

  registration(model: RegistrationRequestInterface): Observable<RegistrationResponse> {
    return this.http.post<any>('http://127.0.0.1:3000/users/create', model);
  }

  login(model: AuthorizationRequest): Observable<AuthorizationResponse> {
    return this.http.post<any>('http://127.0.0.1:3000/users/auth', model);
  }

  getMy(): Observable<GetUserResponse> {
    return this.apiService.get('http://127.0.0.1:3000/user/token');
  }
}
