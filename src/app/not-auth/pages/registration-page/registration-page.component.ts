import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {
  status = new FormControl('', [Validators.required]);

  form = this.fb.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required]],
    service: [null],
    password: ['', [Validators.required]],
    passwordDouble: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  submit(): void {
    console.log(this.form.value);
  }
}
