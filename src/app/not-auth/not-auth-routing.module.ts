import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotAuthLayoutComponent } from './not-auth-layout/not-auth-layout.component';

const routes: Routes = [
  {
    path: '',
    component: NotAuthLayoutComponent,
    children: [
      {
        path: 'authorization',
        loadChildren: () => import('./pages/authorization-page/authorization-page.module')
          .then((m => m.AuthorizationPageModule))
      },
      {
        path: 'registration',
        loadChildren: () => import('./pages/registration-page/registration-page.module')
          .then((m => m.RegistrationPageModule))
      },
      {
        path: 'main',
        loadChildren: () => import('./pages/main-page/main-page.module')
          .then((m => m.MainPageModule))
      },
      {
        path: '',
        redirectTo: 'authorization'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotAuthRoutingModule {
}
