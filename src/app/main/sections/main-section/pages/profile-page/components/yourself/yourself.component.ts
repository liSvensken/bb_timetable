import { Component, Input, OnInit } from '@angular/core';
import { UserModel } from '@common/interfaces/models/user.model';

@Component({
  selector: 'app-yourself',
  templateUrl: './yourself.component.html',
  styleUrls: ['./yourself.component.scss']
})
export class YourselfComponent implements OnInit {
  @Input() user: UserModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
