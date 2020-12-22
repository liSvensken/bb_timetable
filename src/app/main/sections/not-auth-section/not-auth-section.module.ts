import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthSectionComponent } from './not-auth-section.component';

const routes: Routes = [
  {
    path: '',
    component: NotAuthSectionComponent,
    children: [
      {
        path: 'authorization',
        loadChildren: () => import('./pages/authorization/authorization.module')
          .then(m => m.AuthorizationModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./pages/registration/registration.module')
          .then(m => m.RegistrationModule)
      },
      {
        path: '',
        redirectTo: 'authorization'
      }
    ]
  }
];

@NgModule({
  declarations: [
    NotAuthSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotAuthSectionModule {
}
