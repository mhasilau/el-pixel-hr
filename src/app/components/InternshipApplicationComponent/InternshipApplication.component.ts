import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
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
import { MatChipsModule } from '@angular/material/chips';
import { ageValidator, oneRequiredValidator } from '../../validators';
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
    MatChipsModule,
  ],
})
export class InternshipApplicationComponent implements OnInit {
  private readonly formStorageKey = 'internshipApplicationForm';

  internshipApplicationForm: FormGroup;

  minDate!: Date;
  maxDate!: Date;

  internship_specs = [{ value: 'React' }, { value: 'Angular' }, { value: 'Python' }];
  englishLevels = [
    { value: 'Beginner / Elementary' },
    { value: 'Pre-Intermediate' },
    { value: 'Intermediate' },
    { value: 'Upper-Intermediate / Advanced' },
  ];
  constructor(private fb: FormBuilder) {
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
        lastName: [
          '',
          [
            Validators.required,
            Validators.minLength(2),
            Validators.maxLength(50),
            Validators.pattern(/^[^\d]*$/),
          ],
        ],
        birthDate: ['', [Validators.required, ageValidator(16, 100)]],
        gender: ['', Validators.required],
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
      }),
      'contact-info': this.fb.group(
        {
          email: ['', [Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)]],
          telegram: [
            '',
            [
              Validators.minLength(5),
              Validators.maxLength(32),
              Validators.pattern(/^@?[a-zA-Z][a-zA-Z0-9_]{3,30}[a-zA-Z0-9]$/),
            ],
          ],
          phone: [
            '',
            [Validators.minLength(7), Validators.maxLength(15), Validators.pattern(/^\d+$/)],
          ],
        },
        { validators: oneRequiredValidator(['telegram', 'email', 'phone']) }
      ),
      'education-info': this.fb.group({
        education: [''],
        about: [''],
        internship_spec: ['', Validators.required],
        englishLevel: ['', Validators.required],
        skills: this.fb.array([]),
      }),
    });
  }

  ngOnInit(): void {
    this.initDateRange();
    this.loadFromLocalStorage();
    this.internshipApplicationForm.valueChanges.subscribe(() => {
      this.saveToLocalStorage();
    });

    this.birthDate?.valueChanges.subscribe(() => {
      this.updateAgeFromBirthDate();
    });
  }

  private initDateRange(): void {
    const today = new Date();
    this.maxDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    this.minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
  }

  clearControl(control: AbstractControl | null | undefined): void {
    if (control) {
      control.setValue('');
      control.markAsTouched();
    }
  }

  addSkill(value?: string): void {
    if (!value?.trim()) return;
    this.skills.push(this.fb.control(value.trim()));
    this.saveToLocalStorage();
  }

  removeSkill(index: number): void {
    this.skills.removeAt(index);
    this.saveToLocalStorage();
  }

  formatPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const cleaned = input.value.replace(/\D/g, '');

    input.value = cleaned;

    this.phone?.setValue(cleaned);
    this.phone?.markAsTouched();
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
    const formData = this.internshipApplicationForm.value;
    localStorage.setItem(this.formStorageKey, JSON.stringify(formData));
  }

  private clearLocalStorage(): void {
    localStorage.removeItem(this.formStorageKey);
  }

  private loadFromLocalStorage(): void {
    const savedData = localStorage.getItem(this.formStorageKey);
    if (savedData) {
      const formData = JSON.parse(savedData);

      if (formData['personal-info']) {
        const personalData = formData['personal-info'];
        this.personalInfo?.patchValue({
          firstName: personalData.firstName || '',
          lastName: personalData.lastName || '',
          birthDate: personalData.birthDate ? new Date(personalData.birthDate) : '',
          gender: personalData.gender || '',
          country: personalData.country || '',
          city: personalData.city || '',
        });
      }

      if (formData['contact-info']) {
        const contactData = formData['contact-info'];
        this.contactInfo?.patchValue({
          phone: contactData.phone || '',
          email: contactData.email || '',
          telegram: contactData.telegram || '',
        });
      }

      if (formData['education-info']) {
        const educationData = formData['education-info'];
        this.educationInfo?.patchValue({
          education: educationData.education || '',
          about: educationData.about || '',
          internship_spec: educationData.internship_spec || '',
          englishLevel: educationData.englishLevel || '',
        });

        this.restoreSkills(educationData.skills);
      }

      if (formData['personal-info']?.birthDate) {
        this.updateAgeFromBirthDate();
      }
    }
  }

  private restoreSkills(savedSkills: unknown): void {
    while (this.skills.length) {
      this.skills.removeAt(0);
    }
    if (Array.isArray(savedSkills)) {
      savedSkills.forEach((skill: unknown) => {
        if (typeof skill === 'string' && skill.trim()) {
          this.skills.push(this.fb.control(skill));
        }
      });
    }
  }

  get personalInfo() {
    return this.internshipApplicationForm.get('personal-info');
  }
  get contactInfo() {
    return this.internshipApplicationForm.get('contact-info');
  }
  get educationInfo() {
    return this.internshipApplicationForm.get('education-info');
  }

  get firstName() {
    return this.personalInfo?.get('firstName');
  }
  get lastName() {
    return this.personalInfo?.get('lastName');
  }
  get birthDate() {
    return this.personalInfo?.get('birthDate');
  }
  get age() {
    return this.personalInfo?.get('age');
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
  get internship_spec() {
    return this.educationInfo?.get('internship_spec');
  }
  get education() {
    return this.educationInfo?.get('education');
  }
  get about() {
    return this.educationInfo?.get('about');
  }
  get englishLevel() {
    return this.educationInfo?.get('englishLevel');
  }
  get email() {
    return this.contactInfo?.get('email');
  }
  get phone() {
    return this.contactInfo?.get('phone');
  }
  get telegram() {
    return this.contactInfo?.get('telegram');
  }
  get skills(): FormArray {
    return this.educationInfo?.get('skills') as FormArray;
  }
  onSubmit(): void {
    if (this.internshipApplicationForm.valid) {
      console.log('Form Submitted:', this.internshipApplicationForm.value);

      this.clearLocalStorage();

      this.internshipApplicationForm.reset();
    } else {
      console.log('Form is invalid');
      this.internshipApplicationForm.markAllAsTouched();
    }
  }
}
