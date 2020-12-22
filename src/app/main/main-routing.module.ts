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
        loadChildren: () => import('./sections/main-section/main-section.module')
          .then((m => m.MainSectionModule)),
        canActivate: [IsAuthGuard]
      },
      {
        path: 'not-auth',
        loadChildren: () => import('./sections/not-auth-section/not-auth-section.module')
          .then((m => m.NotAuthSectionModule)),
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
