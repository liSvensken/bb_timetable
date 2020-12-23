import { Injectable } from '@angular/core';
import { ActivatedRoute, Resolve } from '@angular/router';
import { GetUserByNicknameResponse } from '@common/interfaces/api/get-user-by-nickname-response.interface';
import { UsersApiService } from '@common/services/api/users-api.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ProfilePageResolve implements Resolve<GetUserByNicknameResponse> {
  userNickname: string;

  constructor(private usersApiService: UsersApiService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params
      .subscribe(param => this.userNickname = param.nickname);
  }

  resolve(): Observable<GetUserByNicknameResponse> {
    return this.usersApiService.getUserByNickname(this.userNickname)
      .pipe(
        catchError(() => of(null))
      );
  }
}
