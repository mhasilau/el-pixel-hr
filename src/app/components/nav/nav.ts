import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [MatIconModule, MatButtonModule, MatMenuModule, RouterLink],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {}
