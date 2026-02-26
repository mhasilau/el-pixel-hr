import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InternshipApplicationComponent } from './components/InternshipApplicationComponent/InternshipApplication.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, InternshipApplicationComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('el-pixel-hr');
}
