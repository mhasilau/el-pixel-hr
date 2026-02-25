import { inject, Injectable } from '@angular/core';
import { AllEmployees } from './all-employees';
import { IUser } from '../components/auth-form.model';

@Injectable({
  providedIn: 'root',
})
export class RootForButton {
  employees = inject(AllEmployees);

  allListEmployees: Array<IUser> = [];

  role: string = '';

  checkRootForMenu(id: number): boolean {
    this.employees.getAllEmployees().subscribe((data) => (this.allListEmployees = data));
    this.role = this.allListEmployees.filter((v) => v['id'] === id)[0].role;
    return this.role === 'админ' ||
      this.role === 'Руководитель' ||
      this.role === 'HR' ||
      this.role === 'Руководитель стажировки' ||
      this.role === 'Ментор'
      ? true
      : false;
  }

  checkRootForChange(role: string): boolean {
    return role === 'админ' ? true : false;
  }
}
