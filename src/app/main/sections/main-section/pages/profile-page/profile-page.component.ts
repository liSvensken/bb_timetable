import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUserByNicknameResponse } from '@common/interfaces/api/get-user-by-nickname-response.interface';
import { UserModel } from '@common/interfaces/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '@common/services/session.service';
import { map } from 'rxjs/operators';
import { RoleEnum } from '@common/enums/role.enum';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  private readonly _user$ = new BehaviorSubject<UserModel>(null);

  readonly currentUser$ = this._sessionService.user$;
  readonly currentRoleIsClient$ = this._sessionService.isClient$;

  readonly user$ = this._user$.asObservable();

  constructor(private readonly _activatedRoute: ActivatedRoute,
              private readonly _sessionService: SessionService) {
    this.currentUser$ = this._sessionService.user$;
  }

  ngOnInit(): void {
    const pageData: GetUserByNicknameResponse = this._activatedRoute.snapshot.data.pageData;
    if (!pageData.error) {
      this._user$.next(pageData.result);
    }
  }
}
