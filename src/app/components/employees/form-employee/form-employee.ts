import { Component, inject, OnInit, signal } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { AllEmployees } from '../../../services/all-employees';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from '../../auth-form.model';

@Component({
  selector: 'app-form-employee',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTabsModule,
  ],
  templateUrl: './form-employee.html',
  styleUrl: './form-employee.scss',
})
export class FormEmployee implements OnInit {
  employees = inject(AllEmployees);
  router = inject(Router);
  rout = inject(ActivatedRoute);
  id = Number(this.rout.snapshot.params['id']);
  employee = signal<IUser>({
    id: 0,
    name: '',
    surname: '',
    email: '',
    login: '',
    password: '',
    role: '',
    specialization: '',
  });
  form: FormGroup = new FormGroup({});
  formBuild = inject(FormBuilder);
  forId = Math.floor(Math.random() * (1000 - 3 + 1)) + 3; //id с сервера!!!

  ngOnInit() {
    if (this.id) {
      this.employees
        .getAllEmployees()
        .subscribe((employees) =>
          this.employee.set(employees.filter((item) => item['id'] === this.id)[0]),
        );
    }

    this.form = this.formBuild.group({
      id: [this.employee().id || this.forId],
      name: [
        this.employee().name,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[^\d]*$/),
        ],
      ],
      surname: [
        this.employee().surname,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
          Validators.pattern(/^[^\d]*$/),
        ],
      ],
      email: [this.employee().email, [Validators.required, Validators.pattern(/.*@el-pixel.com$/)]],
      login: [this.employee().login, [Validators.required]],
      password: [this.employee().password, [Validators.required]],
      role: [this.employee().role, [Validators.required]],
      specialization: [this.employee().specialization, []],
    });
  }

  openAfter() {
    this.router.navigate(['employees']);
  }

  addEmployee() {
    //переделать получение данных с сервера!
    this.employees.setAllEmployees(this.form.value);
    this.openAfter();
  }

  saveChanges() {
    //переделать получение данных с сервера!
    this.employees.changeEmployee(this.form.value);
    this.openAfter();
  }
}
