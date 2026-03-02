import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { Employees } from './components/employees/employees';
import { AddEmployee } from './components/employees/add-employee/add-employee';
import { EmployeeEdit } from './components/employees/employee-edit/employee-edit';
import { InternshipApplicationComponent } from './components/InternshipApplicationComponent/InternshipApplication.component';
import { InternsListComponent } from './components/interns-list/interns-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'employees',
    children: [
      { path: '', component: Employees },
      { path: 'create', component: AddEmployee },
      { path: 'edit/:id', component: EmployeeEdit },
    ],
  },
  {
    path: 'internship',
    component: InternshipApplicationComponent,
  },
  {
    path: 'intern-list',
    component: InternsListComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
