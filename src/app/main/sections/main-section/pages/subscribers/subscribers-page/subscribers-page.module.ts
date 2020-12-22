import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SubscribersPageComponent } from './subscribers-page.component';
import { SearchModule } from '../common/components/search/search.module';
import { SubscribersPageResolve } from './subscribers-page.resolve';

const routes: Routes = [
  {
    path: '',
    component: SubscribersPageComponent,
    resolve: { pageData: SubscribersPageResolve }
  }
];

@NgModule({
  declarations: [
    SubscribersPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SearchModule
  ],
  providers: [
    SubscribersPageResolve
  ]
})
export class SubscribersPageModule {
}
