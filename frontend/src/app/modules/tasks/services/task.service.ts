import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AssignedUser } from '../../issue/models/assigned-user.interface';
import { Task, TaskForm } from '../models/task.interface';
import { TaskPriority } from '../models/task-priority.enum';
import { TaskStatus } from '../models/task-status.enum';



@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private apiUrl = 'http://localhost:8081/task';
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    private currentUserId = 1; // TODO: Get from auth service

    private mockUsers: AssignedUser[] = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' }
    ];

    constructor(
        private http: HttpClient,
        private fb: FormBuilder
    ) {
        this.loadTasks();
    }

    private loadTasks(): void {
        this.http.get<Task[]>(`${this.apiUrl}/getAll`)
            .pipe(
                tap(tasks => this.tasksSubject.next(tasks)),
                catchError(this.handleError)
            ).subscribe();
    }

    getMyTasks(): Observable<Task[]> {
        return this.tasksSubject.pipe(
            map(tasks => tasks.filter(task =>
                task.assignedTo.some(user => user.id === this.currentUserId)
            ))
        );
    }

    getTaskById(id: number): Observable<Task> {
        return this.http.get<Task>(`${this.apiUrl}/getById/${id}`).pipe(
            catchError(this.handleError)
        );
    }

    getTasksByProject(projectId: number): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.apiUrl}/project/${projectId}`).pipe(
            catchError(this.handleError)
        );
    }

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.apiUrl}/create`, task).pipe(
            tap(newTask => {
                const tasks = this.tasksSubject.value;
                this.tasksSubject.next([...tasks, newTask]);
            }),
            catchError(this.handleError)
        );
    }

    updateTask(taskId: number, updatedTask: Task): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/update/${taskId}`, updatedTask).pipe(
            tap(task => {
                const tasks = this.tasksSubject.value;
                const index = tasks.findIndex(t => t.id === taskId);
                if (index !== -1) {
                    tasks[index] = task;
                    this.tasksSubject.next([...tasks]);
                }
            }),
            catchError(this.handleError)
        );
    }

    deleteTask(taskId: number): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/delete/${taskId}`).pipe(
            tap(() => {
                const tasks = this.tasksSubject.value.filter(t => t.id !== taskId);
                this.tasksSubject.next(tasks);
            }),
            catchError(this.handleError)
        );
    }
    updateTaskStatus(taskId: number, newStatus: TaskStatus): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/updateStatus/${taskId}/${newStatus}`, {});
    }

    createTaskForm(): FormGroup {
        return this.fb.group({
            name: ['', Validators.required],
            description: [''],
            priority: [TaskPriority.MEDIUM, Validators.required],
            assignedTo: [[]],
            estimatedHours: [0],
            status: [TaskStatus.TODO],
            dueDate: [null],
            projectId: [null, Validators.required]
        });
    }

    mapFormToTask(formValue: TaskForm): Task {
        return {
            ...formValue,
            completed: formValue.status === TaskStatus.COMPLETED,
            dueDate: formValue.dueDate ? new Date(formValue.dueDate) : new Date(),
            assignedTo: formValue.assignedTo.map(userId =>
                this.mockUsers.find(user => user.id === userId) ||
                { id: userId, firstName: 'Unknown', lastName: 'User' }
            )
        };
    }

    getAvailableUsers(): Observable<AssignedUser[]> {
        return of(this.mockUsers);
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}