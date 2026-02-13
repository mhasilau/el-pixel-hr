import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatInputModule, MatFormField, MatLabel } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-InternshipApplicationComponent',
  standalone: true,
  templateUrl: './InternshipApplication.component.html',
  styleUrls: ['./InternshipApplication.component.scss'],
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatButtonToggleModule,
    MatButtonModule,
  ],
})
export class InternshipApplicationComponent {
  private readonly formStorageKey = 'internshipApplicationForm';

  internshipApplicationForm: FormGroup;

  minDate: Date;
  maxDate: Date;

  higherEducationControls: FormGroup[] = [];
  coursesControls: FormGroup[] = [];
  skillsControls: FormGroup[] = [];

  private readonly dynamicFormsGroups = {
    higherEducation: {
      arrayName: 'higherEducationControls',
      formGroupName: 'higherEducation',
      fields: {
        institution: [''],
        startDate: [''],
        endDate: [''],
      },
    },
    courses: {
      arrayName: 'coursesControls',
      formGroupName: 'course',
      fields: {
        course: [''],
        certificate: [''],
      },
    },
    skills: {
      arrayName: 'skillsControls',
      formGroupName: 'skill',
      fields: {
        name: [''],
      },
    },
  } as const;

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());

    this.internshipApplicationForm = this.fb.group({
      'personal-info': this.fb.group({
        firstName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[^\d]*$/),
          ],
        ],
        surname: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[^\d]*$/),
          ],
        ],
        patronymic: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[^\d]*$/),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
          ],
        ],
        birthDate: ['', [Validators.required, this.ageValidator(16, 100)]],
        age: [{ value: '', disabled: true }],
        gender: ['', Validators.required],
        phone: ['', [Validators.minLength(7), Validators.maxLength(15)]],
        country: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[^\d]*$/),
          ],
        ],
        city: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[^\d]*$/),
          ],
        ],
        street: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
        school: ['', Validators.required],
      }),
    });
    this.addItem('higherEducation');
    this.addItem('courses');

    this.loadFromLocalStorage();
    this.internshipApplicationForm.get('personal-info')?.valueChanges.subscribe(() => {
      this.saveToLocalStorage();
    });

    this.birthDate?.valueChanges.subscribe(() => {
      this.updateAgeFromBirthDate();
    });
  }
  onFileSelected(event: Event, formGroup: FormGroup): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      formGroup.patchValue({
        certificate: file,
      });
    }
  }

  addItem(sectionKey: keyof typeof this.dynamicFormsGroups, value?: string): void {
    const config = this.dynamicFormsGroups[sectionKey];
    const array = this[config.arrayName] as FormGroup[];
    const index = array.length;

    let newGroup: FormGroup;

    if (sectionKey === 'skills') {
      if (!value?.trim()) return;
      newGroup = this.fb.group({
        name: [value.trim()],
      });
    } else {
      const fields: Record<string, [string]> = {};
      (Object.keys(config.fields) as Array<keyof typeof config.fields>).forEach((key) => {
        fields[key as string] = [''];
      });
      newGroup = this.fb.group(fields);
    }

    const personalInfo = this.internshipApplicationForm.get('personal-info') as FormGroup;
    personalInfo.addControl(`${config.formGroupName}${index}`, newGroup);
    array.push(newGroup);
  }

  removeItem(sectionKey: keyof typeof this.dynamicFormsGroups, index: number): void {
    const config = this.dynamicFormsGroups[sectionKey];
    const array = this[config.arrayName] as FormGroup[];

    if (sectionKey === 'skills' ? array.length > 0 : array.length > 1) {
      const personalInfo = this.internshipApplicationForm.get('personal-info') as FormGroup;
      personalInfo.removeControl(`${config.formGroupName}${index}`);

      const remainingControls = array.filter((_, i) => i !== index);
      array.length = 0;

      Object.keys(personalInfo.controls).forEach((key) => {
        if (key.startsWith(config.formGroupName)) {
          personalInfo.removeControl(key);
        }
      });

      remainingControls.forEach((control, i) => {
        personalInfo.addControl(`${config.formGroupName}${i}`, control);
        array.push(control);
      });
    }
  }

  clearFile(formGroup: FormGroup): void {
    formGroup.patchValue({
      certificate: null,
    });

    const fileInput = document.getElementById(
      'file-' + this.getIndex(formGroup)
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  private getIndex(formGroup: FormGroup): number {
    return this.coursesControls.findIndex((control) => control === formGroup);
  }

  formatPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    //delete all non-numbers
    const cleaned = input.value.replace(/\D/g, '');

    input.value = cleaned;

    this.phone?.setValue(cleaned);
    this.phone?.markAsTouched();
  }

  preventNonNumeric(event: KeyboardEvent): void {
    const allowedKeys = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'Backspace',
      'Delete',
      'Tab',
      'Enter',
      'ArrowLeft',
      'ArrowRight',
      'Home',
      'End',
      'Shift',
    ];

    if (!allowedKeys.includes(event.key) && !event.ctrlKey && !event.metaKey) {
      event.preventDefault();
    }
  }

  onPhonePaste(event: ClipboardEvent): void {
    event.preventDefault();
  }

  private ageValidator(minAge: number, maxAge: number): ValidatorFn {
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

  calculateAge(birthDate: Date | string): number | null {
    const birth = new Date(birthDate);
    const today = new Date();

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  private updateAgeFromBirthDate(): void {
    if (this.birthDate?.valid && this.birthDate.value) {
      const age = this.calculateAge(this.birthDate.value);
      this.age?.setValue(age ? age.toString() : '');
    } else {
      this.age?.setValue('');
    }
  }

  private saveToLocalStorage(): void {
    const formData = this.internshipApplicationForm.get('personal-info')?.value;
    localStorage.setItem(this.formStorageKey, JSON.stringify(formData));
  }
  private clearLocalStorage(): void {
    localStorage.removeItem(this.formStorageKey);
  }

  private loadFromLocalStorage(): void {
    const savedData = localStorage.getItem(this.formStorageKey);
    if (savedData) {
      const formData = JSON.parse(savedData);
      this.personalInfo?.patchValue({
        firstName: formData.firstName || '',
        surname: formData.surname || '',
        patronymic: formData.patronymic || '',
        email: formData.email || '',
        birthDate: formData.birthDate ? new Date(formData.birthDate) : '',
        gender: formData.gender || '',
        phone: formData.phone || '',
        country: formData.country || '',
        city: formData.city || '',
        street: formData.street || '',
        school: formData.school || '',
      });
      if (formData.birthDate) {
        this.updateAgeFromBirthDate();
      }
      this.restoreDynamicSection('higherEducation', formData.higherEducation);
      this.restoreDynamicSection('courses', formData.course);
      this.restoreDynamicSection('skills', formData.skill);
    }
  }
  private restoreDynamicSection(
    sectionKey: keyof typeof this.dynamicFormsGroups,
    items: Record<string, string>[] | undefined
  ): void {
    const config = this.dynamicFormsGroups[sectionKey];
    const array = this[config.arrayName] as FormGroup[];

    array.length = 0;

    const personalInfo = this.internshipApplicationForm.get('personal-info') as FormGroup;

    Object.keys(personalInfo.controls).forEach((key) => {
      if (key.startsWith(config.formGroupName)) {
        personalInfo.removeControl(key);
      }
    });

    if (items && items.length > 0) {
      items.forEach((item: Record<string, string>, index: number) => {
        let newGroup: FormGroup;

        if (sectionKey === 'skills') {
          newGroup = this.fb.group({
            name: [item['name'] || ''],
          });
        } else {
          const fields: Record<string, [string]> = {};

          (Object.keys(config.fields) as Array<keyof typeof config.fields>).forEach((key) => {
            fields[key as string] = [item[key as string] || ''];
          });
          newGroup = this.fb.group(fields);
        }

        personalInfo.addControl(`${config.formGroupName}${index}`, newGroup);
        array.push(newGroup);
      });
    } else {
      this.addItem(sectionKey);
    }
  }
  get personalInfo() {
    return this.internshipApplicationForm.get('personal-info');
  }
  get firstName() {
    return this.personalInfo?.get('firstName');
  }
  get surname() {
    return this.personalInfo?.get('surname');
  }
  get patronymic() {
    return this.personalInfo?.get('patronymic');
  }
  get email() {
    return this.personalInfo?.get('email');
  }
  get birthDate() {
    return this.personalInfo?.get('birthDate');
  }
  get age() {
    return this.personalInfo?.get('age');
  }
  get phone() {
    return this.personalInfo?.get('phone');
  }
  get country() {
    return this.personalInfo?.get('country');
  }
  get city() {
    return this.personalInfo?.get('city');
  }
  get street() {
    return this.personalInfo?.get('street');
  }
  get gender() {
    return this.personalInfo?.get('gender');
  }
  get school() {
    return this.personalInfo?.get('school');
  }
  get university() {
    return this.personalInfo?.get('university');
  }

  onSubmit(): void {
    if (this.internshipApplicationForm.valid) {
      console.log('Form Submitted:', this.internshipApplicationForm.value);

      this.clearLocalStorage();

      this.higherEducationControls = [];
      this.coursesControls = [];
      this.skillsControls = [];

      this.internshipApplicationForm.reset({
        'personal-info': {
          firstName: '',
          surname: '',
          patronymic: '',
          email: '',
          birthDate: '',
          age: { value: '', disabled: true },
          gender: '',
          phone: '',
          country: '',
          city: '',
          street: '',
          school: '',
        },
      });

      this.addItem('higherEducation');
      this.addItem('courses');

      this.age?.setValue('');
    } else {
      console.log('Form is invalid');
      this.internshipApplicationForm.markAllAsTouched();
    }
  }
}
