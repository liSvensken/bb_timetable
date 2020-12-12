import { NgModule } from '@angular/core';
import { MainRoutingModule } from './main-routing.module';
import { MainLayoutModule } from './main-layout/main-layout.module';

@NgModule({
  imports: [
    MainLayoutModule,
    MainRoutingModule
  ]
})
export class MainModule {
}
