import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { duplicatePasswords } from '@common/utils/validations.utils';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UsersApiService } from '@common/services/api/users-api.service';
import { log } from 'util';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    role: ['', [Validators.required]],
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    services: [null],
    password: ['', [Validators.required]],
    passwordDouble: ['', [Validators.required]]
  });

  componentDestroyed$ = new Subject();

  constructor(private fb: FormBuilder,
              private usersApiService: UsersApiService) {
    this.form.controls.role.valueChanges
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(value => {
        if (value === 'master') {
          this.form.controls.services.setValidators([Validators.required]);
          this.form.controls.services.updateValueAndValidity();
        }
      });

    this.form.controls.passwordDouble.setValidators([duplicatePasswords(this.form.controls.password)]);

    this.form.controls.password.valueChanges
      .pipe(first(), takeUntil(this.componentDestroyed$))
      .subscribe(() => this.form.controls.passwordDouble.setValue(this.form.controls.passwordDouble.value));
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      let model;
      if (this.form.controls.role.value === 'master') {
        model = {
          role: this.form.controls.role.value,
          name: this.form.controls.name.value,
          email: this.form.controls.email.value,
          services: this.form.controls.services.value
        };
      } else {
        model = {
          role: this.form.controls.role.value,
          name: this.form.controls.name.value,
          email: this.form.controls.email.value
        };
      }
      this.usersApiService.registrationUser(model)
        .subscribe(
          (value) => console.log(value),
          (error) => console.log(error));
    }
  }

  post(): void {
    this.usersApiService.getUser()
      .subscribe(e => console.log(e.result));
  }
}
