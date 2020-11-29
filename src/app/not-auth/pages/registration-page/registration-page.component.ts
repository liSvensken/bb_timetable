import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { duplicatePasswords } from '../../../common/utils/validations.utils';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  status = new FormControl('', [Validators.required]);

  form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    service: [null, [Validators.required]],
    password: ['', [Validators.required]],
    passwordDouble: ['', [Validators.required]]
  });

  componentDestroyed$ = new Subject();

  constructor(private fb: FormBuilder) {
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
    console.log(this.form.value);
  }
}
