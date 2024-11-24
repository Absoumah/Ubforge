import { Routes } from '@angular/router';

export default [
    {
        path: '',
        loadComponent: () => import('./components/issue-list/issue-list.component')
            .then(m => m.IssueListComponent)
    },
    {
        path: 'create',
        loadComponent: () => import('./components/issue-form/issue-form.component')
            .then(m => m.IssueFormComponent)
    },
    {
        path: 'edit/:id',
        loadComponent: () => import('./components/issue-form/issue-form.component')
            .then(m => m.IssueFormComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./components/issue-detail/issue-detail.component')
            .then(m => m.IssueDetailComponent)
    }
] as Routes;