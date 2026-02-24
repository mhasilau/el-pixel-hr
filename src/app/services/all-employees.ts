import { inject, Injectable, OnInit } from '@angular/core';
import { IUser } from '../components/auth-form.model';
import { from} from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class AllEmployees{

  // http = inject(HttpClient)

  employeesList:Array<IUser> = [
    {
      'id':1,
      "name":"Name-one",
      "surname":"surnameOne",
      "email":"email@el-pixel.com",
      "login":"login",
      "password":"password",
      "role":"Руководитель стажировки",
      "specialization":"Angular"
    },
    
    {
      'id':2,
      "name":"Name-two",
      "surname":"surnameTwo",
      "email":"email2@el-pixel.com",
      "login":"login2",
      "password":"password2",
      "role":"HR",
      "specialization":"React"
    }
  ]

  setAllEmployees(user:IUser) {
    this.employeesList.push(user)
  }

  getAllEmployees() {
    return from([this.employeesList])
  }

  deleteEmployee(id:number){
    const index = this.employeesList.findIndex(v=>v['id']===id)
    this.employeesList.splice(index,1)
    return from([this.employeesList])
  }

  changeEmployee(item:IUser){
    const index = this.employeesList.findIndex(v=>v['id']===item.id) 
    this.employeesList[index]=item    
    return  from([this.employeesList])
  }
}
