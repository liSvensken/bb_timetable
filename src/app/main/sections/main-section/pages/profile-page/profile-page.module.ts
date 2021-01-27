import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePageComponent } from './profile-page.component';
import { ProfilePageResolve } from './profile-page.resolve';
import { MainButtonModule } from '@common/components/main-button/main-button.module';
import { YourselfComponent } from './components/yourself/yourself.component';

const routes: Routes = [
  {
    path: '',
    component: ProfilePageComponent,
    resolve: { pageData: ProfilePageResolve }
  }
];

@NgModule({
  declarations: [
    ProfilePageComponent,
    YourselfComponent
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
