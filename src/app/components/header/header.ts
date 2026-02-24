import { Component, inject } from '@angular/core';
import { Nav } from "../nav/nav";
import { MatDialog } from '@angular/material/dialog';
import { AuthForm } from '../auth-form/auth-form';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";


@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, Nav, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  readonly dialog = inject(MatDialog);

  nameUser:string = ''//избавиться от этой переменной
  
  openDialog(): void {
    const dialogRef = this.dialog.open(AuthForm,{ width: '60vw', height: '50vh'}); 
    dialogRef.afterClosed().pipe(filter((date)=>!!date)).subscribe(result => {          
      this.nameUser =result.userName 
    })
  }

}
