import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../header/header';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AllEmployees } from '../../services/all-employees.service';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from './delete-dialog';
import { IUser } from '../auth-form.model';
import { LoaderComponent } from '../loader/loader.component';
import { delay } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-employees',
  imports: [
    Header,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    RouterOutlet,
    LoaderComponent,
    TranslatePipe,
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Employees implements OnInit {
  dialog = inject(MatDialog);
  employeesList = inject(AllEmployees);
  router = inject(Router);

  isLoading = signal<boolean>(false);

  targetUser: IUser = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    login: '',
    password: '',
    role: '',
    specialization: '',
  };
  displayedColumns: string[] = [
    'name',
    'surname',
    'email',
    'role',
    'specialization',
    'edit',
    'delete',
  ];
  allEmployeesList = signal<Array<IUser>>([]);

  ngOnInit() {
    this.isLoading.set(true);
    this.employeesList
      .getAllEmployees()
      .pipe(delay(Math.random() * 2500 + 500))
      .subscribe({
        next: (data) => {
          this.allEmployeesList.set(data);
        },
      })
      .add(() => this.isLoading.set(false));
  }

  openEdit(id: number) {
    this.router.navigate(['employees/edit/' + id]);
  }

  deleteUser(id: number) {
    this.isLoading.set(true);
    this.employeesList
      .deleteEmployee(id)
      .subscribe((employees) => this.allEmployeesList.set(employees))
      .add(() => this.isLoading.set(false));
  }

  openDialog(nameUser: string, id: number): void {
    this.isLoading.set(true);
    const dialogRef = this.dialog.open(DeleteDialog, { width: '50%', data: { name: nameUser } });
    dialogRef
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.deleteUser(id);
        }
      })
      .add(() => this.isLoading.set(false));
  }
}
