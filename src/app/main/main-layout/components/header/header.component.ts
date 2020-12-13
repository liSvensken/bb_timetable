import { Component, OnInit } from '@angular/core';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { SessionService } from '@common/services/session.service';
import { BehaviorSubject } from 'rxjs';
import { RoleEnum } from '@common/enums/role.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  currentUser$ =  this.sessionService.user$;
  role$ = new BehaviorSubject<RoleEnum>(null);
  nickname$ = new BehaviorSubject<string>(null);

  constructor(private myCookiesService: MyCookiesService,
              private sessionService: SessionService) {
  }

  ngOnInit(): void {
    this.role$.next(this.currentUser$.value.role);
    this.nickname$.next(this.currentUser$.value.nickname);
  }

  logOut(): void {
    this.myCookiesService.remove('token');
  }
}
