import { inject, Injectable, OnInit } from '@angular/core';
import { IUser } from '../components/auth-form.model';
import { from} from 'rxjs';


@Injectable({
  providedIn: 'root',
})

export class AllEmployees{
  employeesList:Array<IUser> = [
      {
      'id':1,
      "name":"Admin",
      "surname":"surnameAdmin",
      "email":"admin@el-pixel.com",
      "login":"login1",
      "password":"password1",
      "role":"админ",
      "specialization":"Angular"
    },
    {
      'id':2,
      "name":"Name-one",
      "surname":"surnameOne",
      "email":"email@el-pixel.com",
      "login":"login2",
      "password":"password2",
      "role":"Руководитель стажировки",
      "specialization":"Angular"
    },
    
    {
      'id':3,
      "name":"Name-two",
      "surname":"surnameTwo",
      "email":"email2@el-pixel.com",
      "login":"login3",
      "password":"password3",
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
    return from([this.employeesList.slice(0)])//как по другому здесь изменить ссылку на массив?
  }

  changeEmployee(item:IUser){
    const index = this.employeesList.findIndex(v=>v['id']===item.id) 
    this.employeesList[index]=item    
    return  from([this.employeesList])
  }
}
