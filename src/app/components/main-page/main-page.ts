import { Component } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { Nav } from "../nav/nav";
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-main-page',
  imports: [MatButtonModule, MatIconModule, Nav],
  templateUrl: './main-page.html',
  styleUrl: './main-page.scss',
})
export class MainPage {


}
