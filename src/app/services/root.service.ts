import { inject, Injectable } from '@angular/core';
import { AllEmployees } from './all-employees.service';
import { IUser } from '@models/auth-form.model';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RootService {
  employees = inject(AllEmployees);

  allListEmployees: Array<IUser> = [];

  checkRootForMenu(id: number): Observable<boolean> {
    return this.employees.getAllEmployees().pipe(
      map((data: IUser[]) => {
        const user = data.find((v) => v.id === id);
        const role = user?.role || '';

        return role === 'админ' ||
          role === 'Руководитель' ||
          role === 'HR' ||
          role === 'Руководитель стажировки' ||
          role === 'Ментор'
          ? true
          : false;
      }),
    );
  }

  checkRootForAdmin(role: string): boolean {
    return role === 'админ' ? true : false;
  }
}
