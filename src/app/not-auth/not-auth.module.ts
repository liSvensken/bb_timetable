import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotAuthLayoutModule } from './not-auth-layout/not-auth-layout.module';
import { NotAuthRoutingModule } from './not-auth-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NotAuthLayoutModule,
    NotAuthRoutingModule
  ]
})
export class NotAuthModule {
}
