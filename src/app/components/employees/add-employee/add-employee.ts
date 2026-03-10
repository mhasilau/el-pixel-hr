import { Component } from '@angular/core';
import { FormEmployee } from '@components/employees/form-employee/form-employee';

@Component({
  selector: 'app-employee',
  imports: [FormEmployee],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
})
export class AddEmployee {}
