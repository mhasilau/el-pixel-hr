import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from '../nav/nav';
import { MatDialog } from '@angular/material/dialog';
import { AuthForm } from '../auth-form/auth-form';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { AllEmployees } from '../../services/all-employees.service';
import { IUser } from '../../models/auth-form.model';
import { RootService } from '../../services/root.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { LoaderComponent } from '@components/loader/loader.component';
@Component({
  selector: 'app-header',
  imports: [
    MatButtonModule,
    MatIconModule,
    Nav,
    RouterLink,
    TranslatePipe,
    MatButtonToggleModule,
    LoaderComponent,
  ],
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
  isLoading = signal<boolean>(false);

  ngOnInit(): void {
    this.isLoading.set(true);

    this.employeesList
      .getAllEmployees()
      .subscribe((date) => {
        this.allEmployeesList = date;
      })
      .add(() => this.isLoading.set(false));
    this.employeesList
      .getEmployee()
      .subscribe((employee) => {
        this.employee = employee;
        this.rootForMenu = this.rootService.checkRootForAdmin(this.employee.role);
      })
      .add(() => this.isLoading.set(false));
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthForm, {
      width: '60vw',
      height: '50vh',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.employeesList.getEmployee().subscribe((employee) => {
        this.employee = employee;
        this.rootForMenu = this.rootService.checkRootForAdmin(employee.role);
      });
    });
  }

  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
