import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { oneRequiredValidator } from '../../validators/one-required.validator';
import { AllEmployees } from '../../services/all-employees.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ChangeDetectionStrategy } from '@angular/core';
import { provideLuxonDateAdapter } from '@angular/material-luxon-adapter';
import { FORMAT_FOR_DATA } from '../formatForDate.data';
import { TranslatePipe } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { InternService } from '../../services/interns.service';
import { IIntern } from '../intern.model';
import { filter } from 'rxjs';

@Component({
  selector: 'app-feedback-form',
  imports: [
    Header,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    TranslatePipe,
  ],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.scss',
  providers: [provideLuxonDateAdapter(FORMAT_FOR_DATA)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackForm implements OnInit {
  allListEmployees = inject(AllEmployees);
  role: string = '';
  formBuilder = inject(FormBuilder);
  formType: string = '';
  internId: number | null = null;
  route = inject(ActivatedRoute);
  private internService = inject(InternService);
  mockIntern: IIntern = {
    index: 0,
    firstName: '',
    lastName: '',
    birthDate: new Date(),
    gender: '',
    country: '',
    city: '',
    email: '',
    telegram: '',
    phone: '',
    internship_spec: '',
    englishLevel: '',
  };

  ngOnInit() {
    this.allListEmployees.getEmployee().subscribe((employee) => (this.role = employee.role)); //получение pоли из auth-servise!!!!
    this.internId = Number(this.route.snapshot.params['id']);
    this.formType = history.state['form'];
    this.internService
      .getInternById(this.internId)
      .pipe(filter((data) => !!data))
      .subscribe((intern) => {
        this.mockIntern = intern;
      });
  }

  form = this.formBuilder.group(
    {
      fundamentalLevel: ['', []],
      traineeLevel: [],
      englishLevel: [],
      personals: [],
      addComments: [],
      finishLevel: [],
      dateStart: [],
      dateFinish: [],
    },
    {
      validators: oneRequiredValidator([
        'fundamentalLevel',
        'traineeLevel',
        'englishLevel',
        'personals',
        'addComments',
        'finishLevel',
        'dateStart',
        'dateFinish',
      ]),
    },
  );

  saveFeedback() {
    //сохранить отзыв на сервере, передать имя стажера
    if (this.formType === 'first') {
      const firstFeedback = {
        studentId: this.mockIntern.index,
        feedbackFrom: this.role,
        first: this.form.value,
      };
      console.log(firstFeedback);
    } else if (this.formType === 'finish') {
      const resultFeedback = {
        studentId: this.mockIntern.index,
        feedbackFrom: this.role,
        finish: this.form.value,
      };
      console.log(resultFeedback);
    }
  }
}
