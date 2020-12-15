import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainButtonComponent } from './main-button.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    MainButtonComponent
  ],
  exports: [
    MainButtonComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class MainButtonModule {
}
