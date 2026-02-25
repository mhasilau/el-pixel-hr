import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { Header } from '../header/header';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { AllEmployees } from '../../services/all-employees';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from './delete-dialog';
import { RootForButton } from '../../services/root-for-button';
import { IUser } from '../auth-form.model';

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
  ],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Employees implements OnInit {
  dialog = inject(MatDialog);
  employeesList = inject(AllEmployees);
  router = inject(Router);
  roleRoot = inject(RootForButton);
  roleUser: string = '';
  rootForChange: boolean = false;
  displayedColumns: string[] = ['name', 'surname', 'email', 'role', 'specialization'];
  allEmployeesList = signal<Array<IUser>>([]);

  ngOnInit() {
    this.employeesList.getAllEmployees().subscribe((date) => {
      this.allEmployeesList.set(date);
    });
    this.roleUser = this.roleRoot.role;
    this.rootForChange = this.roleRoot.checkRootForChange(this.roleUser);
    // this.rootForChange = true//удалить, это для проверки прав админа
    if (this.rootForChange) {
      this.displayedColumns = [
        'name',
        'surname',
        'email',
        'role',
        'specialization',
        'edit',
        'delete',
      ];
    }
  }

  openEdit(id: number) {
    this.router.navigate(['employees/edit/' + id]);
  }

  deleteUser(id: number) {
    this.employeesList
      .deleteEmployee(id)
      .subscribe((employees) => this.allEmployeesList.set(employees));
  }

  openDialog(nameUser: string, id: number): void {
    const dialogRef = this.dialog.open(DeleteDialog, { width: '50%', data: { name: nameUser } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(id);
      }
    });
  }
}
