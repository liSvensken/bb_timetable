import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { first, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { RegApiService } from '@common/services/api/reg-api.service';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { duplicatePasswords } from '@common/utils/validations.utils';
import { RoleEnum } from '@common/enums/role.enum';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit, OnDestroy {
  form = this.fb.group({
    role: ['', [Validators.required]],
    nickname: ['', [Validators.required, Validators.minLength(3)]],
    email: ['@mail.ru', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
    passwordDouble: ['', [Validators.required]]
  });

  componentDestroyed$ = new Subject();

  constructor(private fb: FormBuilder,
              private usersApiService: RegApiService,
              private router: Router,
              private myCookiesService: MyCookiesService) {

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
      this.usersApiService.registrationUser(model)
        .subscribe(
          v => {
            if (v.token) {
              this.myCookiesService.put('token', v.token);

              switch (true) {
                case this.form.controls.role.value === RoleEnum.MASTER:
                  this.router.navigate(['/master']);
                  break;

                case this.form.controls.role.value === RoleEnum.CLIENT:
                  this.router.navigate(['/client']);
                  break;
              }
            }
          },
          error =>
            console.log(error));
    }
  }

  testBtn(): void {
    // this.usersApiService.getUser()
    //   .subscribe(e => console.log(e.result));
  }
}
