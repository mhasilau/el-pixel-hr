import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { Employees } from './components/employees/employees';
import { AddEmployee } from './components/employees/add-employee/add-employee';
import { EmployeeEdit } from './components/employees/employee-edit/employee-edit';
import { InternshipApplicationComponent } from './components/internship-application-component/internship-application.component';
import { InternsListComponent } from './components/interns-list/interns-list.component';
import { FeedbackForm } from './components/feedback-form/feedback-form';

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
    children: [
      { path: '', component: InternsListComponent },
      { path: 'create', component: InternshipApplicationComponent },
      { path: 'edit/:id', component: InternshipApplicationComponent },
      { path: 'firstFeedback/:id', component: FeedbackForm },
      { path: 'finishFeedback/:id', component: FeedbackForm },
    ],
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
