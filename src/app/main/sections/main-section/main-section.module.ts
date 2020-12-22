import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainSectionComponent } from './main-section.component';
import { SubscribersPageModule } from './pages/subscribers/subscribers-page/subscribers-page.module';
import { MySubscribersPageModule } from './pages/subscribers/my-subscribers-page/my-subscribers-page.module';

const routes: Routes = [
  {
    path: '',
    component: MainSectionComponent,
    children: [
      {
        path: 'my-subscribers',
        loadChildren: () => import('./pages/subscribers/my-subscribers-page/my-subscribers-page.module')
          .then(m => m.MySubscribersPageModule)
      },
      {
        path: 'subscribers',
        loadChildren: () => import('./pages/subscribers/subscribers-page/subscribers-page.module')
          .then(m => m.SubscribersPageModule)
      },
      {
        path: '',
        redirectTo: 'my-subscribers'
      }
    ]
  }
];

@NgModule({
  declarations: [
    MainSectionComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SubscribersPageModule,
    MySubscribersPageModule
  ]
})
export class MainSectionModule {
}
