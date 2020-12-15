import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { SessionService } from '@common/services/session.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { RoleEnum } from '@common/enums/role.enum';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  currentUser$ = new BehaviorSubject(null);
  roleMaster$ = new BehaviorSubject<boolean>(null);
  roleClient$ = new BehaviorSubject<boolean>(null);
  nickname$ = new BehaviorSubject<string>(null);

  componentDestroyed$ = new Subject();

  constructor(private myCookiesService: MyCookiesService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.currentUser$ = this.sessionService.user$;
    this.currentUser$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        if (this.currentUser$.value) {
          this.roleMaster$.next(this.currentUser$.value.role === RoleEnum.MASTER);
          this.roleClient$.next(this.currentUser$.value.role === RoleEnum.CLIENT);
          this.nickname$.next(this.currentUser$.value.nickname);
        }
      });
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  logOut(): void {
    this.myCookiesService.removeToken();
  }
}
