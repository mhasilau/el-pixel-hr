import { Routes } from '@angular/router';
import { MainPage } from './components/main-page/main-page';

export const routes: Routes = [
    {
        path: "", 
        component: MainPage
    },
    // {
    //     path: "/form", 
    //     component: Form - пашин компонент
    // },
    {
        path: "**", 
        redirectTo: "",
        pathMatch:'full'
    },

];
