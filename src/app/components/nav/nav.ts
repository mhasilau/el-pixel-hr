import { Component, inject, OnInit, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AllEmployees } from '../../services/all-employees.service';
import { IUser } from '../auth-form.model';
import { RootService } from '../../services/root.service';
import { LoaderComponent } from '../loader/loader.component';
import { delay } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterLink,
    TranslatePipe,
    LoaderComponent,
  ],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav implements OnInit {
  employeesList = inject(AllEmployees);

  isLoading = signal<boolean>(false);

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
    this.isLoading.set(true);
    this.employeesList
      .getEmployee()
      .pipe(delay(Math.random() * 2500 + 500))
      .subscribe((employee) => {
        this.employee = employee;
      })
      .add(() => this.isLoading.set(false));
    this.employeeRoot = this.employeesRoot.checkRootForAdmin(this.employee.role);
  }
}
