import { Routes } from '@angular/router';
import { ProjectGuard } from '../project/guards/project.guard';

export default [
    {
        path: '',
        loadComponent: () => import('./components/documentation-list/documentation-list.component')
            .then(m => m.DocumentationListComponent),
        canActivate: [ProjectGuard]
    },
    {
        path: 'create',
        loadComponent: () => import('./components/documentation-form/documentation-form.component')
            .then(m => m.DocumentationFormComponent),
        canActivate: [ProjectGuard]
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/documentation-form/documentation-form.component')
            .then(m => m.DocumentationFormComponent),
        canActivate: [ProjectGuard]
    },
    {
        path: ':id',
        loadComponent: () => import('./components/documentation-item/documentation-item.component')
            .then(m => m.DocumentationItemComponent),
        canActivate: [ProjectGuard]
    }
] as Routes;