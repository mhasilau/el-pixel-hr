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
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { delay } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

import { AllEmployees } from '@services/all-employees.service';
import { RootService } from '@services/root.service';
import { IUser } from '@models/auth-form.model';
import { LoaderComponent } from '@components/loader/loader.component';

@Component({
  selector: 'app-auth-form',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,

    TranslatePipe,
    LoaderComponent,
  ],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm implements OnInit {
  readonly dialogRef = inject(MatDialogRef<AuthForm>);
  employeesList = inject(AllEmployees);
  router = inject(Router);
  rootService = inject(RootService);

  isLoading = signal<boolean>(false);

  allEmployeesList: Array<IUser> = [];
  authForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.isLoading.set(true);
    this.employeesList
      .getAllEmployees()
      .pipe(delay(Math.random() * 2500 + 500))
      .subscribe((employee) => {
        this.allEmployeesList = employee;
      })
      .add(() => this.isLoading.set(false));

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
    if (!user) return;

    this.dialogRef.close();
    this.employeesList.enterEmployee(user);

    this.isLoading.set(true);

    this.rootService
      .checkRootForMenu(user.id)
      .subscribe({
        next: (hasAccess) => {
          if (hasAccess) {
            this.router.navigate(['employees']);
          } else {
            this.router.navigate(['/']);
          }
        },
      })
      .add(() => this.isLoading.set(false));
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
