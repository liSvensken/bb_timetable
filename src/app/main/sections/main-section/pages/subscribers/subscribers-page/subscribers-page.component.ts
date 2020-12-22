import { Component, OnInit } from '@angular/core';
import { UsersSearchRequest } from '@common/interfaces/api/users-search-request.interface';
import { LIMIT_PAGE } from '../common/components/search/search.utils';

@Component({
  selector: 'app-subscribers-page',
  templateUrl: './subscribers-page.component.html',
  styleUrls: ['./subscribers-page.component.scss']
})
export class SubscribersPageComponent implements OnInit {
  modelRequest: UsersSearchRequest = {
    limit: LIMIT_PAGE,
    offset: 0
  };

  constructor() {
  }

  ngOnInit(): void {
  }

}
