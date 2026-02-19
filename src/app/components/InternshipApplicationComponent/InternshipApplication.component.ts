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
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
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
    MatSelectModule,
    MatRadioModule,
  ],
})
export class InternshipApplicationComponent {
  private readonly formStorageKey = 'internshipApplicationForm';

  internshipApplicationForm: FormGroup;

  minDate: Date;
  maxDate: Date;

  skillsControls: FormGroup[] = [];
  specializations = [{ value: 'React' }, { value: 'Angular' }, { value: 'Python' }];
  englishLevels = [
    { value: 'Beginner / Elementary' },
    { value: 'Pre-Intermediate' },
    { value: 'Intermediate' },
    { value: 'Upper-Intermediate / Advanced' },
  ];
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
        email: [
          '',
          [
            Validators.required,
            Validators.email,
            Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
          ],
        ],
        birthDate: ['', [Validators.required, this.ageValidator(16, 100)]],
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
        education: [''],
        about: [''],
        specialization: ['', Validators.required],
        telegram: [
          '',
          [
            Validators.required,
            Validators.minLength(5),
            Validators.maxLength(32),
            Validators.pattern(/^@?[a-zA-Z][a-zA-Z0-9_]{3,30}[a-zA-Z0-9]$/),
          ],
        ],
        englishLevel: ['', Validators.required],
      }),
    });

    this.loadFromLocalStorage();
    this.internshipApplicationForm.get('personal-info')?.valueChanges.subscribe(() => {
      this.saveToLocalStorage();
    });

    this.birthDate?.valueChanges.subscribe(() => {
      this.updateAgeFromBirthDate();
    });
  }

  clearControl(control: AbstractControl | null | undefined): void {
    if (control) {
      control.setValue('');
      control.markAsTouched();
    }
  }
  addSkill(value?: string): void {
    if (!value?.trim()) return;

    const personalInfo = this.personalInfo as FormGroup;
    const newIndex = this.skillsControls.length;
    const controlName = `skill${newIndex}`;

    const newGroup = this.fb.group({
      name: [value.trim()],
    });

    personalInfo.addControl(controlName, newGroup);
    this.skillsControls.push(newGroup);
  }

  removeSkill(index: number): void {
    const personalInfo = this.personalInfo as FormGroup;
    const controlName = `skill${index}`;

    personalInfo.removeControl(controlName);
    this.skillsControls.splice(index, 1);

    const remainingValues = this.skillsControls.map((control) => control.get('name')?.value);

    Object.keys(personalInfo.controls).forEach((key) => {
      if (key.startsWith('skill')) {
        personalInfo.removeControl(key);
      }
    });

    this.skillsControls = [];
    remainingValues.forEach((value, i) => {
      const newControlName = `skill${i}`;
      const skillGroup = this.fb.group({
        name: [value || ''],
      });
      personalInfo.addControl(newControlName, skillGroup);
      this.skillsControls.push(skillGroup);
    });
  }

  formatPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const cleaned = input.value.replace(/\D/g, '');

    input.value = cleaned;

    this.phone?.setValue(cleaned);
    this.phone?.markAsTouched();
  }

  preventNonNumeric(event: Event): void {
    const input = event.target as HTMLInputElement;
    const original = input.value;
    let clean = original.replace(/[^0-9.]/g, '');
    console.log(clean);
    input.value = clean;
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
        email: formData.email || '',
        birthDate: formData.birthDate ? new Date(formData.birthDate) : '',
        gender: formData.gender || '',
        phone: formData.phone || '',
        country: formData.country || '',
        city: formData.city || '',
        specialization: formData['specialization'] || '',
        education: formData['education'] || '',
      });
      if (formData.birthDate) {
        this.updateAgeFromBirthDate();
      }
      this.restoreSkills(formData);
    }
  }

  private restoreSkills(formData: Record<string, unknown>): void {
    const personalInfo = this.personalInfo as FormGroup;

    this.skillsControls = [];
    Object.keys(personalInfo.controls).forEach((key) => {
      if (key.startsWith('skill')) {
        personalInfo.removeControl(key);
      }
    });

    let skillIndex = 0;

    while (true) {
      const skillKey = `skill${skillIndex}`;
      const skillValue = formData[skillKey];

      if (skillValue === undefined) {
        break;
      }

      const controlName = `skill${skillIndex}`;

      if (skillValue && typeof skillValue === 'object' && 'name' in skillValue) {
        const nameValue = (skillValue as { name?: unknown }).name;
        personalInfo.addControl(
          controlName,
          this.fb.group({
            name: [typeof nameValue === 'string' ? nameValue : ''],
          }),
        );
      } else {
        personalInfo.addControl(
          controlName,
          this.fb.group({
            name: [typeof skillValue === 'string' ? skillValue : ''],
          }),
        );
      }

      this.skillsControls.push(personalInfo.get(controlName) as FormGroup);
      skillIndex++;
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
  get gender() {
    return this.personalInfo?.get('gender');
  }
  get specialization() {
    return this.personalInfo?.get('specialization');
  }
  get education() {
    return this.personalInfo?.get('education');
  }
  get about() {
    return this.personalInfo?.get('about');
  }
  get telegram() {
    return this.personalInfo?.get('telegram');
  }
  get englishLevel() {
    return this.personalInfo?.get('englishLevel');
  }
  onSubmit(): void {
    if (this.internshipApplicationForm.valid) {
      console.log('Form Submitted:', this.internshipApplicationForm.value);

      this.clearLocalStorage();

      this.skillsControls = [];

      this.internshipApplicationForm.reset({
        'personal-info': {
          firstName: '',
          surname: '',
          email: '',
          birthDate: '',
          gender: '',
          phone: '',
          country: '',
          city: '',
          specialization: '',
          education: '',
          about: '',
          telegram: '',
          englishLevel: '',
        },
      });
    } else {
      console.log('Form is invalid');
      this.internshipApplicationForm.markAllAsTouched();
    }
  }
}
