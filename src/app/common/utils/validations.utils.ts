import { AbstractControl, ValidatorFn } from '@angular/forms';

export function duplicatePasswords(controlFirst: AbstractControl): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    const valid = !controlFirst.value || control.value === controlFirst.value;
    return valid ? null : { notDuplicatePasswords: true };
  };
}
