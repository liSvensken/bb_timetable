import { Injectable } from '@angular/core';
import { UserModel } from '@common/interfaces/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  user$ = new BehaviorSubject<UserModel>(null);

  constructor() {
  }

  setCurrentUser(user: UserModel): void {
    this.user$.next(user);
  }

  getCurrentUser(): UserModel | null {
    return this.user$.value;
  }

  removeCurrentUser(): void {
    this.user$.next(null);
  }
}
