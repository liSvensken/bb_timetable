import { Component, HostListener } from '@angular/core';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { SessionService } from '@common/services/session.service';
import { BehaviorSubject } from 'rxjs';
import { RoleEnum } from '@common/enums/role.enum';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-layout-header',
  templateUrl: './layout-header.component.html',
  styleUrls: ['./layout-header.component.scss']
})
export class LayoutHeaderComponent {
  private readonly _isScroll$ = new BehaviorSubject(null);

  readonly currentUser$ = this._sessionService.user$;
  readonly roleIsMaster$ = this._sessionService.isMaster$;
  readonly roleIsClient$ = this._sessionService.isClient$;

  readonly isScroll = this._isScroll$.asObservable();

  constructor(private readonly _myCookiesService: MyCookiesService,
              private readonly _sessionService: SessionService) {
  }

  @HostListener('window:scroll') scroll(): void {
    // если расстоние от верха страницы !== 0
    if (window.pageYOffset) {
      this._isScroll$.next(true);
    } else {
      this._isScroll$.next(false);
    }
  }

  logOut(): void {
    this._myCookiesService.removeToken();
  }
}
