import { Component, inject, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AllEmployees } from '../../services/all-employees.service';
import { IUser } from '../auth-form.model';
import { RootService } from '../../services/root.service';

@Component({
  selector: 'app-nav',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit {
  employeesList = inject(AllEmployees);
  employee: IUser = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    login: '',
    password: '',
    role: '',
    specialization: '',
  };
  employeesRoot = inject(RootService);
  employeeRoot: boolean = false;
  ngOnInit(): void {
    this.employeesList.getEmployee().subscribe((employee) => (this.employee = employee));
    this.employeeRoot = this.employeesRoot.checkRootForAdmin(this.employee.role);
  }
}
