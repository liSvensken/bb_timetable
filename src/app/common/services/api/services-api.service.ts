import { Injectable } from '@angular/core';
import { ApiService } from '@common/services/api/api.service';
import { Observable } from 'rxjs';
import { GetServicesRequest } from '@common/interfaces/api/get-services-request.interface';
import { GetServicesResponse } from '@common/interfaces/api/get-services-response.interface';

@Injectable({ providedIn: 'root' })
export class ServicesApiService {
  constructor(private apiService: ApiService) {
  }

  getServices(model: GetServicesRequest): Observable<GetServicesResponse> {
    return this.apiService.post('http://127.0.0.1:3000/services', model);
  }
}
