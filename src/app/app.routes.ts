import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'notes',
        pathMatch: 'full',
    },
    {
        path:'notes',
        component:HomepageComponent
    }
];
