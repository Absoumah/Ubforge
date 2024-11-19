import { Routes } from '@angular/router';

import { HelloWorldComponent } from './modules/hello-world/hello-world.component';

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
        loadComponent: () => import('./modules/project/components/project-list/project-list.component')
            .then(m => m.ProjectListComponent)
    },
    {
        path: 'projects/create',
        loadComponent: () => import('./modules/project/components/project-form/project-form.component')
            .then(m => m.ProjectFormComponent)
    },
    {
        path: 'projects/edit/:id',
        loadComponent: () => import('./modules/project/components/project-form/project-form.component')
            .then(m => m.ProjectFormComponent)
    },
    {
        path: 'issues',
        loadComponent: () => import('./modules/issue/components/issue-list/issue-list.component')
            .then(m => m.IssueListComponent)
    },
    {
        path: 'issues/create',
        loadComponent: () => import('./modules/issue/components/issue-form/issue-form.component')
            .then(m => m.IssueFormComponent)

    },
    {
        path: 'issues/edit/:id',
        loadComponent: () => import('./modules/issue/components/issue-form/issue-form.component')
            .then(m => m.IssueFormComponent)
    },
    {
        path: 'issues/:id',
        loadComponent: () => import('./modules/issue/components/issue-detail/issue-detail.component')
            .then(m => m.IssueDetailComponent)
    },
    {
        path: 'my-tasks',
        loadComponent: () => import('./modules/tasks/components/my-tasks/my-tasks.component')
            .then(m => m.MyTasksComponent)
    },
    {
        path: 'tasks/:id',
        loadComponent: () => import('./modules/tasks/components/task-detail/task-detail.component')
            .then(m => m.TaskDetailComponent)
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
