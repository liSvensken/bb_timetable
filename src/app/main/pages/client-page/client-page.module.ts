import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ClientPageComponent } from './client-page.component';

const routes: Routes = [
  {
    path: '',
    component: ClientPageComponent
  }
];

@NgModule({
  declarations: [
    ClientPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class ClientPageModule {
}
