import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersApiService } from '@common/services/api/users-api.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  profileName: string;

  constructor(private activatedRoute: ActivatedRoute,
              private usersApiService: UsersApiService) {

    this.activatedRoute.params
      .subscribe(v => {
        this.profileName = v.nickname;
      });

    // this.usersApiService.getUserByNickname(this.userNickname)
    //   .pipe()
    //   .subscribe();
  }

  ngOnInit(): void {
  }

}
