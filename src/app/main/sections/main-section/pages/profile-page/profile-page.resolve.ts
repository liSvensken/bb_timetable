import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { GetUserByNicknameResponse } from '@common/interfaces/api/get-user-by-nickname-response.interface';
import { UsersApiService } from '@common/services/api/users-api.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProfilePageResolve implements Resolve<GetUserByNicknameResponse> {
  userNickname: string;

  constructor(private usersApiService: UsersApiService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<GetUserByNicknameResponse> {
    this.userNickname = route.params.nickname;
    return this.usersApiService.getUserByNickname(this.userNickname)
      .pipe(
        catchError(() => of(null))
      );
  }
}
