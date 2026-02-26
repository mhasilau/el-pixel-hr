import { AbstractControl, ValidationErrors, ValidatorFn, FormGroup } from '@angular/forms';

export function oneRequiredValidator(fields: string[]): ValidatorFn {
  return (group: AbstractControl): ValidationErrors | null => {
    const formGroup = group as FormGroup;

    const hasAtLeastOne = fields.some((fieldName) => {
      const control = formGroup.get(fieldName);
      const value = control?.value;
      return value && value.toString().trim().length > 0;
    });

    return hasAtLeastOne ? null : { oneRequired: true };
  };
}
