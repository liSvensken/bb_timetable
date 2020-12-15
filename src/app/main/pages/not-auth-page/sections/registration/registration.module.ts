import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '@common/components/controls/select/select.module';
import { InputModule } from '@common/components/controls/input/input.module';
import { MainButtonModule } from '@common/components/main-button/main-button.module';
import { RadioModule } from '@common/components/controls/radio/radio.module';

const routes: Routes = [
  {
    path: '',
    component: RegistrationComponent,
  }
];

@NgModule({
  declarations: [
    RegistrationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SelectModule,
    InputModule,
    MainButtonModule,
    RadioModule,
    ReactiveFormsModule
  ]
})
export class RegistrationModule {
}
