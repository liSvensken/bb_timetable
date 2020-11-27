import { AbstractControl, FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';


export function duplicatePassword(controlFirst: AbstractControl): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valid = control.value === controlFirst.value || !controlFirst.value;
    return valid ? null : { differentPassword: true };
  };
}

export function someTrue(): ValidatorFn {
  return (formArray: FormArray): ValidationErrors | null => {
    const valid = formArray.controls.some(control => control.value);
    return valid ? null : { someTrue: true };
  };
}

