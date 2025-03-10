import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./components/release-list/release-list.component')
            .then(m => m.ReleaseListComponent)
    },
    {
        path: 'new',
        loadComponent: () => import('./components/release-form/release-form.component')
            .then(m => m.ReleaseFormComponent)
    },
    {
        path: ':id', 
        loadComponent: () => import('./components/release-detail/release-detail.component')
        .then(m => m.ReleaseDetailComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/release-form/release-form.component')
            .then(m => m.ReleaseFormComponent)
    }
] as Routes;