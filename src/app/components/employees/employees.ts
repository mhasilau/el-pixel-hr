import {ChangeDetectionStrategy, ChangeDetectorRef, Component, DoCheck, inject,model, OnInit, signal} from '@angular/core';
import { Header } from "../header/header";
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { AllEmployees } from '../../services/all-employees';
import { IUser } from '../auth-form.model';
import {MatTableModule} from '@angular/material/table';
import {Router, RouterLink, RouterOutlet } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialog } from './delete-dialog';

@Component({
  selector: 'app-employees',
  imports: [Header, MatButtonModule, MatDividerModule, MatIconModule, MatTableModule, RouterLink, RouterOutlet],
  templateUrl: './employees.html',
  styleUrl: './employees.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class Employees implements OnInit{
  cdr = inject(ChangeDetectorRef)
  dialog = inject(MatDialog);
  employeesList = inject(AllEmployees)
  router = inject(Router)

  displayedColumns : string [] = [ 'name' , 'surname' , 'email', 'role' , 'specialization','edit','delete'];
  allEmployeesList = signal<any>([])//ANY!!!

  ngOnInit(){
    this.employeesList.getAllEmployees().subscribe(date=>{this.allEmployeesList.set(date)}) 
  }

  openEdit(id:number){
    this.router.navigate(['employees/edit/' + id])//id!!!
  }

  deleteUser(nameUser:string){
    this.allEmployeesList.update(arr=>arr.filter((item:IUser)=>item!['name']!==nameUser))
  }

  openDialog(nameUser:string): void {
      const dialogRef = this.dialog.open(DeleteDialog, {width: '50%', data: {name: nameUser}} );
      dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteUser(nameUser)
      }
    });
  }
}




