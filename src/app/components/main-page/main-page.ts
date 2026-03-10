import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthForm } from '../auth-form/auth-form';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap, delay } from 'rxjs';
import { Header } from '@components/header/header';
import { Router } from '@angular/router';
import { LoaderComponent } from '@components/loader/loader.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-main-page',
  imports: [MatButtonModule, Header, TranslatePipe, LoaderComponent],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  readonly dialog = inject(MatDialog);
  router = inject(Router);

  isLoading = signal<boolean>(false);
  nameUser: string = ''; //избавиться от этой переменной

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthForm, { width: '60vw', height: '50vh' });
    dialogRef
      .afterClosed()
      .pipe(
        filter((date) => !!date),
        tap(() => this.isLoading.set(true)),
        delay(Math.random() * 2500 + 500),
      )
      .subscribe((result) => {
        this.nameUser = result.userName;
      })
      .add(() => this.isLoading.set(false));
  }
  openInternCreateForm(): void {
    this.router.navigate(['/internship/create']);
  }
}
