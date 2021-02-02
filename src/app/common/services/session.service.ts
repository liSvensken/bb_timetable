import { Injectable } from '@angular/core';
import { UserModel } from '@common/interfaces/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { RoleEnum } from '@common/enums/role.enum';

@Injectable({ providedIn: 'root' })
export class SessionService {
  private readonly _user$ = new BehaviorSubject<UserModel>(null);
  readonly user$ = this._user$.asObservable();
  readonly isMaster$ = this.user$
    .pipe(map(user => user.role === RoleEnum.MASTER));
  readonly isClient$ = this.user$
    .pipe(map(user => user.role === RoleEnum.CLIENT));

  setCurrentUser(user: UserModel): void {
    this._user$.next(user);
  }

  getCurrentUser(): UserModel | null {
    return this._user$.value;
  }

  removeCurrentUser(): void {
    this._user$.next(null);
  }
}
