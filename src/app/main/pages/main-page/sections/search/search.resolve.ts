import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UserSearchResponse } from '@common/interfaces/api/user-search-response.interface';
import { UsersApiService } from '@common/services/api/users-api.service';
import { Observable, of } from 'rxjs';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { LIMIT_PAGE } from './search.utils';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SearchResolve implements Resolve<UserSearchResponse> {
  constructor(private usersApiService: UsersApiService) {
  }

  resolve(): Observable<UserSearchResponse> {
    const model: UsersSearchRequest = {
      limit: LIMIT_PAGE,
      offset: 0
    };

    return this.usersApiService.searchMasters(model)
      .pipe(
        catchError(() => of(null))
      );
  }
}
