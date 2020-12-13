import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component';

const routes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    children: [
      {
        path: 'search',
        loadChildren: () => import('./sections/search/search.module')
          .then(m => m.SearchModule)
      }
    ]
  }
];

@NgModule({
  declarations: [
    MainPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class MainPageModule {
}
