import { Injectable } from '@angular/core';
import { ApiService } from '@common/services/api/api.service';
import { Observable } from 'rxjs';
import { GetCitiesRequest } from '@common/interfaces/api/get-cities-request.interface';
import { GetCitiesResponse } from '@common/interfaces/api/get-cities.response';

@Injectable({ providedIn: 'root' })
export class CitiesApiService {
  constructor(private apiService: ApiService) {
  }

  getCities(model: GetCitiesRequest): Observable<GetCitiesResponse> {
    return this.apiService.post('http://127.0.0.1:3000/cities', model);
  }
}
