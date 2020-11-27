import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationPageComponent } from './registration-page.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from '../../../common/components/controls/select/select.module';
import { InputModule } from '../../../common/components/controls/input/input.module';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPageComponent,
  }
];

@NgModule({
  declarations: [
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    SelectModule,
    InputModule
  ]
})
export class RegistrationPageModule {
}
