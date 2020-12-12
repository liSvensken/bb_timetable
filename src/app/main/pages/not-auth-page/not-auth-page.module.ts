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
        loadChildren: () => import('./pages/authorization-page/authorization-page.module')
          .then(m => m.AuthorizationPageModule)
      },
      {
        path: 'registration',
        loadChildren: () => import('./pages/registration-page/registration-page.module')
          .then(m => m.RegistrationPageModule)
      },
      {
        path: 'main',
        loadChildren: () => import('./pages/main-page/main-page.module')
          .then(m => m.MainPageModule)
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
