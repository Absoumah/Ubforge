import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./components/project-list/project-list.component')
            .then(m => m.ProjectListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./components/project-form/project-form.component')
            .then(m => m.ProjectFormComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/project-form/project-form.component')
            .then(m => m.ProjectFormComponent)
    }
] as Routes;