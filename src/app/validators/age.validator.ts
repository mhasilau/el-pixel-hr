import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ageValidator(minAge: number, maxAge: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const birthDate = new Date(control.value);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < minAge) {
      return {
        minAge: {
          requiredAge: minAge,
          actualAge: age,
        },
      };
    }
    if (age > maxAge) {
      return {
        maxAge: {
          requiredAge: maxAge,
          actualAge: age,
        },
      };
    }

    return null;
  };
}
