import { Component, inject, OnInit, signal } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { AllEmployees } from '../../services/all-employees.service';
import { IUser } from '../auth-form.model';
import { Router } from '@angular/router';
import { RootService } from '../../services/root.service';

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
  router = inject(Router);
  rootService = inject(RootService);
  allEmployeesList: Array<IUser> = [];
  authForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.employeesList.getAllEmployees().subscribe((employee) => {
      this.allEmployeesList = employee;
    });

    this.authForm = new FormGroup({
      userLogin: new FormControl('', [Validators.required]),
      userPassword: new FormControl('', [Validators.required]),
    });
  }

  hide = signal(true);

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  enter() {
    const user = this.allEmployeesList.filter(
      (v) => v['login'] === this.authForm.value.userLogin,
    )[0];
    this.dialogRef.close();
    this.employeesList.enterEmployee(user);
    if (this.rootService.checkRootForAdmin(user.role)) {
      this.router.navigate(['employees']);
    } else if (this.rootService.checkRootForMenu(user.id)) {
      this.router.navigate(['employees']); //изменить на список стажеров, когда будет готов это компонент
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
