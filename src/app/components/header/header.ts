import { Component, inject, OnInit, signal } from '@angular/core';
import { Nav } from "../nav/nav";
import { MatDialog } from '@angular/material/dialog';
import { AuthForm } from '../auth-form/auth-form';
import { filter } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from "@angular/router";
import { AllEmployees } from '../../services/all-employees';
import { IUser } from '../auth-form.model';
import { RootForButton } from '../../services/root-for-button';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatIconModule, Nav, RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header implements OnInit{
  readonly dialog = inject(MatDialog);
  employeesList = inject(AllEmployees)
  forRoot = inject(RootForButton)
  allEmployeesList:Array<IUser>=[]
  employee:IUser = {
    id: 0,
    name: '',
    surname: '',
    email: '',
    login: '',
    password: '',
    role: '',
    specialization: ''
  } 

  rootForMenu:boolean = false

  ngOnInit(): void {
    this.employeesList.getAllEmployees().subscribe(date=>{this.allEmployeesList = date}) 
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AuthForm,{ width: '60vw', height: '50vh'}); 
    dialogRef.afterClosed().pipe(filter((date)=>!!date)).subscribe(result => {  
    this.employee = result  
    this.checkRoot(this.employee.id)//проверку на сотрудника переписать/с сервера!!!
    })
  }

  checkRoot(id:number){//проверку на сотрудника переписать/с сервера!!
    this.rootForMenu = this.forRoot.checkRootForMenu(id)
  }
}
