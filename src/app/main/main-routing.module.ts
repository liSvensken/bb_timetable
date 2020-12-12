import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';

// todo +Guards

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'not-auth',
        loadChildren: () => import('./pages/not-auth-page/not-auth-page.module')
          .then((m => m.NotAuthPageModule))
      },
      {
        path: 'master',
        loadChildren: () => import('./pages/master-page/master-page.module')
          .then((m => m.MasterPageModule))
      },
      {
        path: 'client',
        loadChildren: () => import('./pages/client-page/client-page.module')
          .then((m => m.ClientPageModule))
      },
      {
        path: '',
        redirectTo: 'not-auth'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule {
}
