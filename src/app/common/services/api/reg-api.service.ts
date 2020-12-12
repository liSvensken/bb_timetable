import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegistrationRequestInterface } from '@common/interfaces/api/registration-request.interface';
import { RegistrationResponse } from '@common/interfaces/api/registration-response.interface';

@Injectable({ providedIn: 'root' })
export class RegApiService {
  constructor(private http: HttpClient) {
  }

  registrationUser(model: RegistrationRequestInterface): Observable<RegistrationResponse> {
    return this.http.post<any>('http://127.0.0.1:3000/users/create', model);
  }
}
