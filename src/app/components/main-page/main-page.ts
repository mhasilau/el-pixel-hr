import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { AuthForm } from '../auth-form/auth-form';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs';
import { Header } from '../header/header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-page',
  imports: [MatButtonModule, Header, RouterLink],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {
  readonly dialog = inject(MatDialog);

  nameUser: string = ''; //избавиться от этой переменной

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthForm, { width: '60vw', height: '50vh' });
    dialogRef
      .afterClosed()
      .pipe(filter((date) => !!date))
      .subscribe((result) => {
        this.nameUser = result.userName;
      });
  }
}
