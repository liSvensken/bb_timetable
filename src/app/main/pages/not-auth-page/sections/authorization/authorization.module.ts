import { forwardRef, NgModule } from '@angular/core';
import { AuthorizationComponent } from './authorization.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RadioModule } from '@common/components/controls/radio/radio.module';
import { InputModule } from '@common/components/controls/input/input.module';
import { MainButtonModule } from '@common/components/main-button/main-button.module';
import { FormGroup, FormsModule, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationComponent,
  }
];

@NgModule({
  declarations: [
    AuthorizationComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    RadioModule,
    InputModule,
    MainButtonModule,
    ReactiveFormsModule
  ]
})
export class AuthorizationModule {
}
