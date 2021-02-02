import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthApiService } from '@common/services/api/auth-api/auth-api.service';
import { MyCookiesService } from '@common/services/my-cookies.service';
import { SessionService } from '@common/services/session.service';

@Component({
  selector: 'app-authorization-page',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss']
})
export class AuthorizationComponent {
  form = this.fb.group({
    login: ['liza', [Validators.required, Validators.minLength(3)]],
    password: ['372992ldl', [Validators.required]]
  });

  constructor(private fb: FormBuilder,
              private authApiService: AuthApiService,
              private router: Router,
              private myCookiesService: MyCookiesService,
              private sessionService: SessionService) {
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
              this.sessionService.setCurrentUser(v.result);
              this.router.navigate(['/subscribers']);
            }
          },
          error =>
            console.log(error));
    }
  }
}
