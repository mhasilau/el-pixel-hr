import { Component} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import { Header } from "../header/header";

@Component({
  selector: 'app-main-page',
  imports: [MatButtonModule, Header],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {

  
}
