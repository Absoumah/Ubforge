import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AssignedUser } from '../../issue/models/assigned-user.interface';
import { Task, TaskForm } from '../models/task.interface';
import { TaskPriority } from '../models/task-priority.enum';
import { TaskStatus } from '../models/task-status.enum';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private currentUserId = 1; // Mock current user (John Doe)
    private tasksSubject = new BehaviorSubject<Task[]>([
        {
            id: 1,
            name: 'Implement login page',
            description: 'Create responsive login page with validation',
            priority: TaskPriority.HIGH,
            status: TaskStatus.IN_PROGRESS,
            completed: false,
            assignedTo: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
            estimatedHours: 8,
            dueDate: new Date('2024-03-25'),
            projectId: 1,
        },
        {
            id: 2,
            name: 'Fix navigation bug',
            description: 'Address issues with mobile navigation',
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
            estimatedHours: 4,
            dueDate: new Date('2024-03-20'),
            projectId: 2,
        }
    ]);

    private availableUsers: AssignedUser[] = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
        { id: 3, firstName: 'Mike', lastName: 'Johnson' }
    ];

    constructor(private fb: FormBuilder) { }

    getMyTasks(): Observable<Task[]> {
        return this.tasksSubject.pipe(
            map(tasks => tasks.filter(task =>
                task.assignedTo.some(user => user.id === this.currentUserId)
            ))
        );
    }

    getTaskById(id: number): Observable<Task | undefined> {
        return this.tasksSubject.pipe(
            map(tasks => tasks.find(task => task.id === id))
        );
    }

    getTasksByProject(projectId: number): Observable<Task[]> {
        return this.tasksSubject.pipe(
            map(tasks => tasks.filter(task => task.projectId === projectId))
        );
    }

    updateTaskStatus(taskId: number, status: TaskStatus): Observable<void> {
        const tasks = this.tasksSubject.getValue();
        const taskIndex = tasks.findIndex(t => t.id === taskId);

        if (taskIndex !== -1) {
            tasks[taskIndex] = {
                ...tasks[taskIndex],
                status,
                completed: status === TaskStatus.COMPLETED
            };
            this.tasksSubject.next([...tasks]);
        }

        return of(void 0);
    }

    createTaskForm(): FormGroup {
        return this.fb.group({
            id: [Date.now()],
            name: ['', Validators.required],
            description: [''],
            priority: [TaskPriority.MEDIUM, Validators.required],
            assignedTo: [[]],
            estimatedHours: [0],
            completed: [false],
            status: [TaskStatus.TODO],
            dueDate: [null]
        });
    }

    getAvailableUsers(): Observable<AssignedUser[]> {
        return of(this.availableUsers);
    }

    mapFormToTask(formValue: TaskForm): Task {
        const assignedTo = formValue.assignedTo.map(userId =>
            this.availableUsers.find(user => user.id === userId)
        ).filter(user => user !== undefined) as AssignedUser[];

        return {
            ...formValue,
            assignedTo,
            completed: false,
            status: formValue.status || TaskStatus.TODO,
            dueDate: formValue.dueDate || new Date()
        };
    }
}