import { Routes } from '@angular/router';
import { ProjectGuard } from '../project/guards/project.guard';

export default [
    {
        path: '',
        loadComponent: () => import('./components/sprint-list/sprint-list.component')
            .then(m => m.SprintListComponent),
        canActivate: [ProjectGuard]
    },
    {
        path: 'create',
        loadComponent: () => import('./components/sprint-form/sprint-form.component')
            .then(m => m.SprintFormComponent),
        canActivate: [ProjectGuard]
    },
    {
        path: ':id',
        loadComponent: () => import('./components/sprint-detail/sprint-detail.component')
            .then(m => m.SprintDetailComponent),
        canActivate: [ProjectGuard]
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/sprint-form/sprint-form.component')
            .then(m => m.SprintFormComponent),
        canActivate: [ProjectGuard]
    }
] as Routes;