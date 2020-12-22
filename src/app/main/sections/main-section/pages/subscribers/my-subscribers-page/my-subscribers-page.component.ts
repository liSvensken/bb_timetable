import { Component, OnInit } from '@angular/core';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { LIMIT_PAGE } from '../common/components/search/search.utils';

@Component({
  selector: 'app-my-subscribers-page',
  templateUrl: './my-subscribers-page.component.html',
  styleUrls: ['./my-subscribers-page.component.scss']
})
export class MySubscribersPageComponent implements OnInit {
  modelRequest: UsersSearchRequest = {
    limit: LIMIT_PAGE,
    offset: 0,
    onlyMy: true
  };

  constructor() {
  }

  ngOnInit(): void {
    console.log(1234);
  }

}
