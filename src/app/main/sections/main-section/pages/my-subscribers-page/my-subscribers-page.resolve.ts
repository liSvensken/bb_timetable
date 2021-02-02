import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UsersSearchResponse } from '@common/interfaces/api/user-search-response.interface';
import { UsersApiService } from '@common/services/api/users-api.service';
import { Observable, of } from 'rxjs';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { LIMIT_PAGE } from '../../common/components/search/search.utils';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MySubscribersPageResolve implements Resolve<UsersSearchResponse> {

  constructor(private usersApiService: UsersApiService) {
  }

  resolve(): Observable<UsersSearchResponse> {
    const model: UsersSearchRequest = {
      limit: LIMIT_PAGE,
      offset: 0,
      onlyMy: true
    };
    return this.usersApiService.searchUsers(model)
      .pipe(
        catchError(() => of(null))
      );
  }
}
