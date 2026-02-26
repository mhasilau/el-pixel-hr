import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { AllEmployees } from '../../services/all-employees';
import { IUser } from '../auth-form.model';

@Component({
  selector: 'app-auth-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogClose,
  ],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AuthForm>);
  employeesList = inject(AllEmployees);
  allEmployeesList: Array<IUser> = [];

  ngOnInit(): void {
    this.employeesList.getAllEmployees().subscribe((employee) => {
      this.allEmployeesList = employee;
    });
  }

  userValid: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    //надо будет потом вынести в отдельный файл с валидаторами формы
    return this.allEmployeesList.some((v) => v['login'] === control.value)
      ? null
      : { noUserLogin: true };
  };

  passwordValid: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    return this.allEmployeesList.some(
      (v) => v['login'] === this.authForm.controls?.['userLogin'].value,
    ) && this.allEmployeesList.some((v) => v['password'] === control.value)
      ? null
      : { noUserLoginPassword: true };
  }; //перепроверить валидацию!!!!!!!!

  authForm: FormGroup = new FormGroup({
    userLogin: new FormControl('', [this.userValid, Validators.required]),
    userPassword: new FormControl('', [this.passwordValid, Validators.required]),
  });

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  enter() {
    const user = this.allEmployeesList.filter(
      (v) => v['login'] === this.authForm.value.userLogin,
    )[0];
    this.dialogRef.close(user);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
