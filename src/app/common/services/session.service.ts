import { Injectable } from '@angular/core';
import { UserModelInterface } from '@common/interfaces/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService {
  user$ = new BehaviorSubject<UserModelInterface>(null);

  constructor() {
  }

  setCurrentUser(user: UserModelInterface): void {
    this.user$.next(user);
  }

  getCurrentUser(): UserModelInterface | null {
    return this.user$.value;
  }

  removeCurrentUser(): void {
    this.user$.next(null);
  }
}
