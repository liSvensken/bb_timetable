import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '@common/services/api/auth-api.service';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { RoleEnum } from '@common/enums/role.enum';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization-page.component.html',
  styleUrls: ['./authorization-page.component.scss']
})
export class AuthorizationPageComponent implements OnInit {
  form = this.fb.group({
    login: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private authApiService: AuthApiService,
              private router: Router,
              private myCookiesService: MyCookiesService) {
  }

  ngOnInit(): void {

  }

  submit(): void {
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const model = {
        login: this.form.controls.login.value,
        password: this.form.controls.password.value
      };

      this.authApiService.login(model)
        .subscribe(
          v => {
            if (v.token) {
              this.myCookiesService.put('token', v.token);

              switch (true) {
                case v.result.role === RoleEnum.MASTER:
                  this.router.navigate(['/master']);
                  break;

                case v.result.role === RoleEnum.CLIENT:
                  this.router.navigate(['/client']);
                  break;
              }
            }
          },
          error =>
            console.log(error));
    }
  }
}
