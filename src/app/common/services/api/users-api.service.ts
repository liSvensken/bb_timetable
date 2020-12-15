import { Injectable } from '@angular/core';
import { ApiService } from '@common/services/api/api.service';
import { Observable } from 'rxjs';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { UserSearchResponse } from '@common/interfaces/api/user-search-response.interface';

@Injectable({ providedIn: 'root' })
export class UsersApiService {
  constructor(private apiService: ApiService) {
  }

  searchMasters(model: UsersSearchRequest): Observable<UserSearchResponse> {
    return this.apiService.post('http://127.0.0.1:3000/masters', model);
  }
}
