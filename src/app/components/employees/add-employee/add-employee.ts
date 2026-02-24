import { Component} from '@angular/core';
import { Header } from "../../header/header";
import { FormEmployee } from "../form-employee/form-employee";

@Component({
  selector: 'app-employee',
  imports: [FormEmployee, Header],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.scss',
})
export class AddEmployee {


}
