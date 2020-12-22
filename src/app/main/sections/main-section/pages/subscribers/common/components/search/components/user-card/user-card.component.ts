import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@common/interfaces/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { SessionService } from '@common/services/session.service';
import { RoleEnum } from '@common/enums/role.enum';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: UserModel;

  currentUser$ = new BehaviorSubject<UserModel>(null);
  isMaster$ = new BehaviorSubject<boolean>(null);

  constructor(private sessionService: SessionService) {
    this.currentUser$ = this.sessionService.user$;
    this.isMaster$.next(this.currentUser$.value.role === RoleEnum.MASTER);
  }

  ngOnInit(): void {
  }
}
