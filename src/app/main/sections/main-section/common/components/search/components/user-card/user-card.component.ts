import { Component, Input } from '@angular/core';
import { UserModel } from '@common/interfaces/models/user.model';
import { SessionService } from '@common/services/session.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {
  @Input() readonly user: UserModel;
  @Input() readonly link: string;

  readonly isMaster$ = this._sessionService.isMaster$;

  constructor(private readonly _sessionService: SessionService) {
  }
}
