import { Component, inject, OnInit } from '@angular/core';
import { Nav } from '../nav/nav';
import { MatDialog } from '@angular/material/dialog';
import { AuthForm } from '../auth-form/auth-form';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AllEmployees } from '../../services/all-employees.service';
import { IUser } from '../auth-form.model';
import { RootService } from '../../services/root.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, Nav, RouterLink, TranslatePipe, MatButtonToggleModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit {
  readonly dialog = inject(MatDialog);
  employeesList = inject(AllEmployees);
  rootService = inject(RootService);
  private translate = inject(TranslateService);
  allEmployeesList: Array<IUser> = [];
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

  rootForMenu: boolean = false;

  ngOnInit(): void {
    this.employeesList.getAllEmployees().subscribe((date) => {
      this.allEmployeesList = date;
    });
    this.employeesList.getEmployee().subscribe((employee) => {
      this.employee = employee;
    });
    this.rootForMenu = this.rootService.checkRootForAdmin(this.employee.role);
  }

  openDialog(): void {
    this.dialog.open(AuthForm, { width: '60vw', height: '50vh' });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
