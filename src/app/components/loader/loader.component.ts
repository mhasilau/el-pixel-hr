import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loader',
  standalone: true,
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
  imports: [MatProgressSpinnerModule],
})
export class LoaderComponent implements OnInit, OnDestroy {
  ngOnInit() {
    document.addEventListener('keydown', this.preventTab);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.preventTab);
  }

  preventTab(e: KeyboardEvent) {
    if (e.key === 'Tab') {
      e.preventDefault();
    }
  }
}
