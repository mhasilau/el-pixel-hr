import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormBuilder,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { RootForButton } from '../../services/root-for-button';

@Component({
  selector: 'app-feedback-form',
  imports: [Header, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './feedback-form.html',
  styleUrl: './feedback-form.scss',
})
export class FeedbackForm implements OnInit {
  rootForButton = inject(RootForButton);
  role: string = '';
  formBuilder = inject(FormBuilder);
  studentName = ''; //получать из таблицы студентов информацию
  studentSecondName = '';
  studentId = '';

  oneRequiredValidator(fields: string[]): ValidatorFn {
    //импорт из папки валидаторы сделать после слияния
    return (group: AbstractControl): ValidationErrors | null => {
      const hasAtLeastOne = fields.some((fieldName) => {
        const control = group.get(fieldName);
        const value = control?.value;
        return value && value.toString().trim().length > 0;
      });
      return hasAtLeastOne ? null : { oneRequired: true };
    };
  }

  ngOnInit() {
    this.role = this.rootForButton.role;
  }

  form = this.formBuilder.group(
    {
      fundamentalLevel: ['', []],
      traineeLevel: [],
      englishLevel: [],
      personals: [],
      addComments: [],
    },
    {
      validators: this.oneRequiredValidator([
        'fundamentalLevel',
        'traineeLevel',
        'englishLevel',
        'personals',
        'addComments',
      ]),
    },
  );

  saveFeedback() {
    const feedback = {
      studentId: this.studentId,
      feedbackFrom: this.role,
      feedback: this.form.value,
    };
    console.log(feedback); //сохранить отзыв на сервере, передать имя стажера
  }
}
