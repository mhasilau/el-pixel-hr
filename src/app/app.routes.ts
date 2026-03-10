import { Routes } from '@angular/router';

import { MainPage } from '@components/main-page/main-page';
import { Employees } from '@components/employees/employees';
import { AddEmployee } from '@components/employees/add-employee/add-employee';
import { EmployeeEdit } from '@components/employees/employee-edit/employee-edit';
import { InternshipApplicationComponent } from '@components/internship-application-component/internship-application.component';
import { InternsListComponent } from '@components/interns-list/interns-list.component';
import { FeedbackForm } from '@components/feedback-form/feedback-form';
import { AuthGuard } from '@guards/auth.guard';
import { LeaveFormGuard } from '@guards/leave-component.guard';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'employees',
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: Employees },
      { path: 'create', canActivate: [AuthGuard], component: AddEmployee },
      { path: 'edit/:id', canActivate: [AuthGuard], component: EmployeeEdit },
    ],
  },
  {
    path: 'internship',
    children: [
      {
        path: 'create',
        canDeactivate: [LeaveFormGuard],
        component: InternshipApplicationComponent,
      },
      {
        path: 'edit/:id',
        canActivate: [AuthGuard],
        canDeactivate: [LeaveFormGuard],
        component: InternshipApplicationComponent,
      },
    ],
  },
  {
    path: 'intern-list',
    children: [
      { path: '', canActivate: [AuthGuard], component: InternsListComponent },
      { path: 'firstFeedback/:id', canActivate: [AuthGuard], component: FeedbackForm },
      { path: 'finishFeedback/:id', canActivate: [AuthGuard], component: FeedbackForm },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
