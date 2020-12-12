import { Component, OnInit } from '@angular/core';
import { MyCookiesService } from '@common/services/my-cookies.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(private myCookiesService: MyCookiesService) {
  }

  ngOnInit(): void {
  }

  logOut(): void {
    this.myCookiesService.remove('token');
  }
}
