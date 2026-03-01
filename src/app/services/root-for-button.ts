import { inject, Injectable } from '@angular/core';
import { AllEmployees } from './all-employees';
import { IUser } from '../components/auth-form.model';

@Injectable({
  providedIn: 'root',
})
export class RootForButton {
  employees = inject(AllEmployees);

  allListEmployees: Array<IUser> = [];

  checkRootForMenu(id: number): boolean {
    this.employees.getAllEmployees().subscribe((data) => (this.allListEmployees = data));
    const role = this.allListEmployees.filter((v) => v['id'] === id)[0].role;
    return role === 'админ' ||
      role === 'Руководитель' ||
      role === 'HR' ||
      role === 'Руководитель стажировки' ||
      role === 'Ментор'
      ? true
      : false;
  }

  checkRootForAdmin(role: string): boolean {
    return role === 'админ' ? true : false;
  }
}
