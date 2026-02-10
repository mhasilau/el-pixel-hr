import { Component, inject, signal } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AbstractControl, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {MatDialogClose,MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-auth-form',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, MatButtonModule,MatFormFieldModule,MatInputModule,FormsModule,MatButtonModule,MatDialogClose],
  templateUrl: './auth-form.html',
  styleUrl: './auth-form.scss',
})
export class AuthForm {

  readonly dialogRef = inject(MatDialogRef<AuthForm>);

  inputValid:ValidatorFn = (control:AbstractControl):ValidationErrors|null=>{
    return control.value.length>=5&&control.value.length<11?null:{inputLength:true};
  }//откоректировать валидации в соотвествии с условиями регистрации


  authForm:FormGroup = new FormGroup({
    'userName': new FormControl('',[this.inputValid, Validators.required]),
    'userPassword': new FormControl('',[this.inputValid,Validators.required]),
  })

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  enter(){ 
    this.dialogRef.close(this.authForm.value)
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}





