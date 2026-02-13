import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { InternshipApplicationComponent } from './components/InternshipApplicationComponent/InternshipApplication.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: 'internship-form',
    component: InternshipApplicationComponent,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];
