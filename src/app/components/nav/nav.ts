import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-nav',
  imports: [MatIconModule,MatButtonModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {

}
