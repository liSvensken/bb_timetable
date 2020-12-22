import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-button',
  templateUrl: './main-button.component.html',
  styleUrls: ['./main-button.component.scss']
})
export class MainButtonComponent implements OnInit {
  @Input() content: string;
  @Input() link: string;
  @Input() styleSmall = false;

  constructor() {
  }

  ngOnInit(): void {
  }
}
