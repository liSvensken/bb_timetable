import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainLayoutComponent } from './main-layout.component';
import { LayoutHeaderComponent } from './components/header/layout-header.component';
import { RouterModule } from '@angular/router';
import { MainButtonModule } from '@common/components/main-button/main-button.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    LayoutHeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MainButtonModule
  ]
})
export class MainLayoutModule {
}
