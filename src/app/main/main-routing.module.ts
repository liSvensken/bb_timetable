import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { IsAuthGuard } from '@common/guards/is-auth.guard';
import { IsNotAuthGuard } from '@common/guards/is-not-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/main-page/main-page.module')
          .then((m => m.MainPageModule)),
        canActivate: [IsAuthGuard]
      },
      {
        path: 'not-auth',
        loadChildren: () => import('./pages/not-auth-page/not-auth-page.module')
          .then((m => m.NotAuthPageModule)),
        canActivate: [IsNotAuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    IsAuthGuard,
    IsNotAuthGuard
  ]
})
export class MainRoutingModule {
}
