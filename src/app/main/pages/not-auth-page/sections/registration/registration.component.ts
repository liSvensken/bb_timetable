import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { duplicatePasswords } from '@common/utils/validations.utils';
import { AuthApiService } from '@common/services/api/auth-api.service';
import { SessionService } from '@common/services/session.service';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    role: ['', [Validators.required]],
    nickname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['@mail.ru', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordDouble: ['', [Validators.required]]
  });

  componentDestroyed$ = new Subject();

  constructor(private fb: FormBuilder,
              private authApiService: AuthApiService,
              private router: Router,
              private myCookiesService: MyCookiesService,
              private sessionService: SessionService) {

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
      const model = {
        role: this.form.controls.role.value,
        nickname: this.form.controls.nickname.value,
        email: this.form.controls.email.value,
        password: this.form.controls.password.value
      };
      this.authApiService.registration(model)
        .subscribe(
          v => {
            if (v.token) {
              this.myCookiesService.setToken(v.token);
              this.sessionService.setCurrentUser(v.result);
              this.router.navigate(['auth/search']);
            }
          },
          error =>
            console.log(error));
    }
  }
}
