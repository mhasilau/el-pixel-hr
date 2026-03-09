import { Component, OnDestroy, OnInit, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
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
//import { StorageService } from '../../services/storage.service';
import { InternService } from '../../services/interns.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, delay } from 'rxjs';
import { AllEmployees } from '../../services/all-employees.service';
import { LoaderComponent } from '../loader/loader.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-internship-application',
  standalone: true,
  templateUrl: './internship-application.component.html',
  styleUrls: ['./internship-application.component.scss'],
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
    TranslatePipe,
    LoaderComponent,
  ],
})
export class InternshipApplicationComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private internService = inject(InternService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private subscriptions: Subscription[] = [];
  private allEmployees = inject(AllEmployees);
  internshipApplicationForm: FormGroup;

  isLoading = signal<boolean>(false);
  isEditMode = false;
  internId: number | null = null;

  minDate!: Date;
  maxDate!: Date;

  internship_specs = [{ value: 'React' }, { value: 'Angular' }, { value: 'Python' }];
  englishLevels = [
    { value: 'Beginner / Elementary' },
    { value: 'Pre-Intermediate' },
    { value: 'Intermediate' },
    { value: 'Upper-Intermediate / Advanced' },
  ];
  constructor() {
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
            [Validators.minLength(7), Validators.maxLength(15), Validators.pattern(/^\+?\d+$/)],
          ],
        },
        { validators: oneRequiredValidator(['telegram', 'email', 'phone']) },
      ),
      'education-info': this.fb.group({
        education: [''],
        about: [''],
        internship_spec: ['', Validators.required],
        englishLevel: ['', Validators.required],
        skills: [[]],
      }),
      'internship-details': this.fb.group({
        applicationDate: [''],
        finalStatus: [''],
        startDate: [''],
        endDate: [''],
        rejectionReason: [''],
      }),
    });
  }

  ngOnInit(): void {
    this.initDateRange();

    this.isLoading.set(true);
    const routeSubscribe = this.route.params
      .pipe(delay(Math.random() * 2500 + 500))
      .subscribe((params) => {
        const id = params['id'];
        if (id) {
          this.isEditMode = true;
          this.internId = parseInt(id, 10);

          this.isLoading.set(true);
          this.internService
            .getInternById(this.internId)
            .pipe(delay(Math.random() * 2500 + 500))
            .subscribe((intern) => {
              if (intern) {
                this.internshipApplicationForm.patchValue({
                  'personal-info': {
                    firstName: intern.firstName,
                    lastName: intern.lastName,
                    birthDate: intern.birthDate,
                    gender: intern.gender,
                    country: intern.country,
                    city: intern.city,
                  },
                  'contact-info': {
                    email: intern.email,
                    telegram: intern.telegram,
                    phone: intern.phone,
                  },
                  'education-info': {
                    education: intern.education || '',
                    about: intern.about || '',
                    internship_spec: intern.internship_spec,
                    englishLevel: intern.englishLevel,
                    skills: intern.skills || [],
                  },
                  'internship-details': {
                    applicationDate: intern.applicationDate,
                    finalStatus: intern.finalStatus,
                    startDate: intern.startDate,
                    endDate: intern.endDate,
                    rejectionReason: intern.rejectionReason,
                  },
                });
                this.updateAgeFromBirthDate();
              }
            })
            .add(() => this.isLoading.set(false));
        } else {
          this.isEditMode = false;
          this.internId = null;
          this.isLoading.set(false);
        }
      });
    routeSubscribe.add(() => this.isLoading.set(false));
    this.subscriptions.push(routeSubscribe);
    if (this.birthDate) {
      const birthDateSub = this.birthDate.valueChanges.subscribe(() => {
        this.updateAgeFromBirthDate();
      });
      this.subscriptions.push(birthDateSub);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
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
    const currentSkills = this.educationInfo?.get('skills')?.value || [];
    this.educationInfo?.get('skills')?.setValue([...currentSkills, value.trim()]);
  }

  removeSkill(index: number): void {
    const currentSkills = this.educationInfo?.get('skills')?.value || [];
    currentSkills.splice(index, 1);
    this.educationInfo?.get('skills')?.setValue([...currentSkills]);
  }

  formatPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;

    const cleaned = input.value.replace(/[^\d+]/g, '').replace(/(?!^)\+/g, '');

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

  get personalInfo() {
    return this.internshipApplicationForm.get('personal-info');
  }
  get contactInfo() {
    return this.internshipApplicationForm.get('contact-info');
  }
  get educationInfo() {
    return this.internshipApplicationForm.get('education-info');
  }
  get internshipDetails() {
    return this.internshipApplicationForm.get('internship-details');
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
  get applicationDate() {
    return this.internshipDetails?.get('applicationDate');
  }
  get finalStatus() {
    return this.internshipDetails?.get('finalStatus');
  }
  get startDate() {
    return this.internshipDetails?.get('startDate');
  }
  get endDate() {
    return this.internshipDetails?.get('endDate');
  }
  get rejectionReason() {
    return this.internshipDetails?.get('rejectionReason');
  }

  onSubmit(): void {
    if (this.internshipApplicationForm.valid) {
      if (this.isEditMode && this.internId) {
        this.isLoading.set(true);
        const updateSub = this.internService
          .updateIntern(this.internId, this.internshipApplicationForm.value)
          .pipe(delay(Math.random() * 2500 + 500))
          .subscribe({
            next: (updated) => {
              if (updated) {
                this.router.navigate(['/intern-list']);
              }
            },
          });

        updateSub.add(() => this.isLoading.set(false));
        this.subscriptions.push(updateSub);
      } else {
        this.isLoading.set(true);
        const createSub = this.internService
          .createApply(this.internshipApplicationForm.value)
          .pipe(delay(Math.random() * 2500 + 500))
          .subscribe({
            next: (newIntern) => {
              if (newIntern) {
                this.router.navigate(['/']);
              }
            },
          });
        createSub.add(() => this.isLoading.set(false));
        this.subscriptions.push(createSub);
      }
    } else {
      this.internshipApplicationForm.markAllAsTouched();
    }
  }
}
