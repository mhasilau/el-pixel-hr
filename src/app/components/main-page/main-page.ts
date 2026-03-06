import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthForm } from '../auth-form/auth-form';
import { MatDialog } from '@angular/material/dialog';
import { filter, tap, delay } from 'rxjs';
import { Header } from '../header/header';
import { RouterLink } from '@angular/router';
import { LoaderComponent } from '../loader/loader.component';

@Component({
  selector: 'app-main-page',
  imports: [MatButtonModule, Header, RouterLink, LoaderComponent],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  readonly dialog = inject(MatDialog);

  isLoading = false;
  nameUser: string = ''; //избавиться от этой переменной

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthForm, { width: '60vw', height: '50vh' });
    dialogRef
      .afterClosed()
      .pipe(
        filter((date) => !!date),
        tap(() => (this.isLoading = true)),
        delay(Math.random() * 2500 + 500),
      )
      .subscribe((result) => {
        this.nameUser = result.userName;
        this.isLoading = false;
      });
  }
}
