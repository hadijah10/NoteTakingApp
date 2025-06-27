import { Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { CreatenoteComponent } from './components/createnote/createnote.component';
import { EditformComponent } from './components/editform/editform.component';
import { ArchiveComponent } from './components/archive/archive.component';

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
        path: 'notes/:id',
        component:EditformComponent
    },
    {
    path:'create',
    component: CreatenoteComponent
    },
    {
        path: 'archive',
        component:ArchiveComponent
    }
];
