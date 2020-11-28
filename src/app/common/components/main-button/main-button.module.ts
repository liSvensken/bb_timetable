import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainButtonComponent } from './main-button.component';

@NgModule({
  declarations: [
    MainButtonComponent
  ],
  exports: [
    MainButtonComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MainButtonModule {
}
