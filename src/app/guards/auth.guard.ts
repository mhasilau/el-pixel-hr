import { Injectable, inject } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AllEmployees } from '@services/all-employees.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  private allEmployees = inject(AllEmployees);
  private router = inject(Router);

  canActivate(): boolean {
    return this.checkAuth();
  }
  canActivateChild(): boolean {
    return this.checkAuth();
  }

  checkAuth(): boolean {
    const currentUser = this.allEmployees.employee;
    if (currentUser && currentUser.id > 0) {
      return true;
    } else {
      this.router.navigate(['/']);
      return false;
    }
  }
}
