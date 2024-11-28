import { Routes } from '@angular/router';

import { HelloWorldComponent } from './modules/hello-world/hello-world.component';
import { ProjectGuard } from './modules/project/guards/project.guard';

export const routes: Routes = [
    // we'll keep here, for now
    { path: 'hello-world', component: HelloWorldComponent },

    // // prod routes
    // { path: 'projects', component: ProjectListComponent },
    // { path: 'projects/create', component: ProjectFormComponent },
    // { path: 'projects/edit/:id', component: ProjectFormComponent },
    // { path: '', redirectTo: '/projects', pathMatch: 'full' }

    {
        path: 'dashboard',
        loadComponent: () => import('./modules/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
    },
    {
        path: 'settings',
        loadComponent: () => import('./modules/settings/settings.component')
            .then(m => m.SettingsComponent)
    },
    {
        path: 'projects',
        loadChildren: () => import('./modules/project/projects.routes')
            .then(routes => routes)
    },
    {
        path: 'issues',
        canActivate: [ProjectGuard],
        loadChildren: () => import('./modules/issue/issues.routes')
            .then(routes => routes)
    },
    {
        path: 'tasks',
        canActivate: [ProjectGuard],
        loadChildren: () => import('./modules/tasks/tasks.routes')
            .then(routes => routes)
    },
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./core/components/not-found/not-found.component')
            .then(m => m.NotFoundComponent)
    }
    // TODO: add a 404 page
];

// @NgModule({
//     imports: [RouterModule.forRoot(routes)],
//     exports: [RouterModule]
// })

// export class AppRoutingModule { }
