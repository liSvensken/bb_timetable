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
        path: 'auth',
        loadChildren: () => import('./pages/main-page/main-page.module')
          .then((m => m.MainPageModule))
      },
      {
        path: 'not-auth',
        loadChildren: () => import('./pages/not-auth-page/not-auth-page.module')
          .then((m => m.NotAuthPageModule))
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
