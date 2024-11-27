import { Routes } from '@angular/router';

export default [
    {
        path: 'board',
        loadComponent: () => import('./components/kanban-board/kanban-board.component')
            .then(m => m.KanbanBoardComponent)
    },
    {
        path: 'my-tasks',
        loadComponent: () => import('./components/my-tasks/my-tasks.component')
            .then(m => m.MyTasksComponent)
    },
    {
        path: ':id',
        loadComponent: () => import('./components/task-detail/task-detail.component')
            .then(m => m.TaskDetailComponent)
    }
] as Routes;