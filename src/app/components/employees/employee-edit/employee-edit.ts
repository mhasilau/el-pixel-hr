import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AllEmployees } from '../../../services/all-employees';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';
import { Header } from "../../header/header";
import { IUser } from '../../auth-form.model';
import { FormEmployee } from "../form-employee/form-employee";

@Component({
  selector: 'app-employee-edit',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatDividerModule, MatIconModule, MatTabsModule, Header, FormEmployee],
  templateUrl: './employee-edit.html',
  styleUrl: './employee-edit.scss',
})
export class EmployeeEdit{


}
