import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthPageComponent } from './not-auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: NotAuthPageComponent,
    children: [
      {
        path: 'authorization',
        loadChildren: () => import('./sections/authorization/authorization.module')
          .then(m => m.AuthorizationModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./sections/registration/registration.module')
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
    NotAuthPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class NotAuthPageModule {
}
