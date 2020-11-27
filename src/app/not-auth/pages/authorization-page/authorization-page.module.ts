import { NgModule } from '@angular/core';
import { AuthorizationPageComponent } from './authorization-page.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationPageComponent,
  }
];

@NgModule({
  declarations: [
    AuthorizationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthorizationPageModule {
}
