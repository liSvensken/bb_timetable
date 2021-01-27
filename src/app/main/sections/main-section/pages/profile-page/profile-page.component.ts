import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUserByNicknameResponse } from '@common/interfaces/api/get-user-by-nickname-response.interface';
import { UserModel } from '@common/interfaces/models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { SessionService } from '@common/services/session.service';
import { takeUntil } from 'rxjs/operators';
import { RoleEnum } from '@common/enums/role.enum';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  componentDestroyed$ = new Subject();

  currentUser$ = new BehaviorSubject<UserModel>(null);
  currentRoleIsClient$ = new BehaviorSubject<boolean>(null);

  user$ = new BehaviorSubject<UserModel>(null);

  constructor(private activatedRoute: ActivatedRoute,
              private sessionService: SessionService) {
    this.currentUser$ = this.sessionService.user$;
  }

  ngOnInit(): void {
    const pageData: GetUserByNicknameResponse = this.activatedRoute.snapshot.data.pageData;
    if (!pageData.error) {
      this.user$.next(pageData.result);
    }

    this.currentUser$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(() => {
        if (this.currentUser$.value) {
          this.currentRoleIsClient$.next(this.currentUser$.value.role === RoleEnum.CLIENT);
        }
      });
  }
}
