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
    // task.service.ts
    private tasksSubject = new BehaviorSubject<Task[]>([
        {
            id: 1,
            name: 'Investigate login failures',
            description: 'Check server logs for authentication errors',
            priority: TaskPriority.HIGH,
            status: TaskStatus.IN_PROGRESS,
            completed: false,
            assignedTo: [
                { id: 1, firstName: 'John', lastName: 'Doe' },
                { id: 2, firstName: 'Jane', lastName: 'Smith' },
                { id: 3, firstName: 'Mike', lastName: 'Johnson' }
            ],
            estimatedHours: 4,
            dueDate: new Date('2024-03-10'),
            projectId: 1
        },
        {
            id: 2,
            name: 'Create dark theme variables',
            description: 'Define color palette for dark mode',
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 2, firstName: 'Jane', lastName: 'Smith' }],
            estimatedHours: 6,
            dueDate: new Date('2024-03-20'),
            projectId: 2
        },
        {
            id: 3,
            name: 'Profile dashboard performance',
            description: 'Use Chrome DevTools to identify bottlenecks',
            priority: TaskPriority.HIGH,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 3, firstName: 'Mike', lastName: 'Johnson' }],
            estimatedHours: 8,
            dueDate: new Date('2024-04-01'),
            projectId: 1
        },
        {
            id: 4,
            name: 'Document new endpoints',
            description: 'Add OpenAPI specifications',
            priority: TaskPriority.LOW,
            status: TaskStatus.COMPLETED,
            completed: true,
            assignedTo: [{ id: 4, firstName: 'Sarah', lastName: 'Wilson' }],
            estimatedHours: 3,
            dueDate: new Date('2024-03-18'),
            projectId: 2
        },
        {
            id: 5,
            name: 'Fix mobile navigation',
            description: 'Address hamburger menu issues',
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.IN_PROGRESS,
            completed: false,
            assignedTo: [{ id: 5, firstName: 'Alex', lastName: 'Brown' }],
            estimatedHours: 5,
            dueDate: new Date('2024-03-22'),
            projectId: 1
        },
        {
            id: 6,
            name: 'Design new settings UI',
            description: 'Create mockups for new preferences',
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 6, firstName: 'Emily', lastName: 'Davis' }],
            estimatedHours: 7,
            dueDate: new Date('2024-03-28'),
            projectId: 2
        },
        {
            id: 7,
            name: 'Fix session timeout issue',
            description: 'Ensure sessions do not expire prematurely',
            priority: TaskPriority.HIGH,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
            estimatedHours: 3,
            dueDate: new Date('2024-03-12'),
            projectId: 1
        },
        {
            id: 8,
            name: 'Improve error messages',
            description: 'Provide more descriptive error messages on login failure',
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 2, firstName: 'Jane', lastName: 'Smith' }],
            estimatedHours: 2,
            dueDate: new Date('2024-03-14'),
            projectId: 1
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
            dueDate: [null],
            projectId: [null, Validators.required]
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

updateTask(taskId: number, updatedTask: Task): Observable<void> {
    const tasks = this.tasksSubject.getValue();
    const taskIndex = tasks.findIndex(t => t.id === taskId);
  
    if (taskIndex !== -1) {
      tasks[taskIndex] = {
        ...tasks[taskIndex],
        ...updatedTask,
        id: taskId 
      };
      this.tasksSubject.next([...tasks]);
    }
  
    return of(void 0);
  }
}