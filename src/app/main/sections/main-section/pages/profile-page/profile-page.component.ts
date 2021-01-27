import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetUserByNicknameResponse } from '@common/interfaces/api/get-user-by-nickname-response.interface';
import { UserModel } from '@common/interfaces/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  user$ = new BehaviorSubject<UserModel>(null);

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    const pageData: GetUserByNicknameResponse = this.activatedRoute.snapshot.data.pageData;
    if (!pageData.error) {
      this.user$.next(pageData.result);
    }
  }
}
