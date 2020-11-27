import { NgModule } from '@angular/core';
import { NotAuthLayoutComponent } from './not-auth-layout.component';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [
    RouterModule
  ],
  declarations: [
    NotAuthLayoutComponent,
    HeaderComponent
  ]
})
export class NotAuthLayoutModule {
}
