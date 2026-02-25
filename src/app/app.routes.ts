import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';
import { InternsListComponent } from './components/interns-list/interns-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MainPage,
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'intern-list',
    component: InternsListComponent,
  },
];
