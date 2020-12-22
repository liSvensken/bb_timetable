import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MySubscribersPageComponent } from './my-subscribers-page.component';
import { SearchModule } from '../common/components/search/search.module';
import { MySubscribersPageResolve } from './my-subscribers-page.resolve';

const routes: Routes = [
  {
    path: '',
    component: MySubscribersPageComponent,
    resolve: {pageData: MySubscribersPageResolve}
  }
];

@NgModule({
  declarations: [
    MySubscribersPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchModule
  ],
  providers: [
    MySubscribersPageResolve
  ]
})
export class MySubscribersPageModule {
}
