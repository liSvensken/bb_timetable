import { Component, OnDestroy, OnInit } from '@angular/core';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { SessionService } from '@common/services/session.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { RoleEnum } from '@common/enums/role.enum';
import { takeUntil } from 'rxjs/operators';
import { UserModel } from '@common/interfaces/models/user.model';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent implements OnInit, OnDestroy {
  currentUser$ = new BehaviorSubject<UserModel>(null);
  roleMaster$ = new BehaviorSubject<boolean>(null);
  roleClient$ = new BehaviorSubject<boolean>(null);
  nickname$ = new BehaviorSubject<string>(null);

  componentDestroyed$ = new Subject();

  isScroll$ = new BehaviorSubject(null);

  constructor(private myCookiesService: MyCookiesService,
              private sessionService: SessionService) {
    this.currentUser$ = this.sessionService.user$;
  }

  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll);

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
    window.removeEventListener('scroll', this.scroll);

    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  scroll = (event): void => {
    // если расстоние от верха страницы !== 0
    if (window.pageYOffset) {
      this.isScroll$.next(true);
    } else {
      this.isScroll$.next(false);
    }
  }

  logOut(): void {
    this.myCookiesService.removeToken();
  }
}
