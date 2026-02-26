import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RootForButton } from '../../services/root-for-button';
import { oneRequiredValidator } from '../../validators/one-required.validator';

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
      validators: oneRequiredValidator([
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
