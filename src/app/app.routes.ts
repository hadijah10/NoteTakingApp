import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreatenoteComponent } from './components/createnote/createnote.component';

export const routes: Routes = [
    {
        path:'',
        redirectTo:'notes',
        pathMatch: 'full',
    },
    {
        path:'notes',
        component:HomepageComponent
    },
    {
    path:'create',
    component: CreatenoteComponent
    }
];
