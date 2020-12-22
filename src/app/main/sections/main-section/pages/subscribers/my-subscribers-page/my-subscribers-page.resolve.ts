import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { UsersSearchResponse } from '@common/interfaces/api/user-search-response.interface';
import { UsersApiService } from '@common/services/api/users-api.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { LIMIT_PAGE } from '../common/components/search/search.utils';
import { catchError } from 'rxjs/operators';
import { RoleEnum } from '@common/enums/role.enum';
import { SessionService } from '@common/services/session.service';
import { UserModel } from '@common/interfaces/models/user.model';

@Injectable()
export class MySubscribersPageResolve implements Resolve<UsersSearchResponse> {
  currentUser$ = new BehaviorSubject<UserModel>(null);

  constructor(private usersApiService: UsersApiService,
              private sessionService: SessionService) {
    this.currentUser$ = this.sessionService.user$;
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
