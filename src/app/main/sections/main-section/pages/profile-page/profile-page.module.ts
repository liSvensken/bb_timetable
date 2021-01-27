import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageResolve } from './profile-page.resolve';
import { MainButtonModule } from '@common/components/main-button/main-button.module';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    resolve: { pageData: ProfilePageResolve }
  }
];

@NgModule({
  declarations: [
    ProfilePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MainButtonModule,
  ],
  providers: [
    ProfilePageResolve
  ]
})
export class ProfilePageModule {
}
