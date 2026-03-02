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
import { MY_FORMATS } from '../formForDate.data';

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
  ],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.scss',
  providers: [provideLuxonDateAdapter(MY_FORMATS)],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeedbackForm implements OnInit {
  allListEmployees = inject(AllEmployees);
  role: string = '';
  formBuilder = inject(FormBuilder);
  studentName = ''; //получать из таблицы студентов информацию
  studentSecondName = '';
  studentId = '';
  firstFeedback: boolean = false; //получаем из таблицы что было нажато в меню.(или активроутер получаем путь и меняем переменную)Дописать логику
  resultFeedback: boolean = false;

  ngOnInit() {
    this.allListEmployees.getEmployee().subscribe((employee) => (this.role = employee.role));
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
    if (this.firstFeedback) {
      const firstFeedback = {
        studentId: this.studentId,
        feedbackFrom: this.role,
        first: this.form.value,
      };
      console.log(firstFeedback);
    } else if (this.resultFeedback) {
      const resultFeedback = {
        studentId: this.studentId,
        feedbackFrom: this.role,
        finish: this.form.value,
      };
      console.log(resultFeedback);
    }
  }
}
