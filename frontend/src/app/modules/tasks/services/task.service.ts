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
    tasks$ = this.tasksSubject.asObservable();
    private currentUserId = 1; // TODO: Get from auth service

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
          )
          .subscribe();
      }

    getTasks(): Observable<Task[]> {
        return this.tasks$; 
    }
    

    getMyTasks(): Observable<Task[]> {
        return this.tasks$.pipe(
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
            const tasks = this.tasksSubject.value.map(t => t.id === taskId ? task : t);
            this.tasksSubject.next(tasks);
          }),
          catchError(this.handleError)
        );
      }

      updateTaskStatus(taskId: number, newStatus: TaskStatus): Observable<Task> {
        return this.http.put<Task>(`${this.apiUrl}/updateStatus/${taskId}/${newStatus}`, {}).pipe(
          tap(updatedTask => {
            const tasks = this.tasksSubject.value.map(t => t.id === taskId ? updatedTask : t);
            this.tasksSubject.next(tasks);
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

    // updateTaskStatus(taskId: number, newStatus: TaskStatus): Observable<Task> {
    //     return this.http.put<Task>(`${this.apiUrl}/updateStatus/${taskId}/${newStatus}`, {});
    // }

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
            dueDate: formValue.dueDate ? new Date(formValue.dueDate) : null,
            assignedTo: formValue.assignedTo.map(userId => ({ id: userId } as AssignedUser))
        };
    }

    //TODO : put it in a separate service
    getAvailableUsers(): Observable<AssignedUser[]> {
        return this.http.get<AssignedUser[]>('http://localhost:8081/user/getAll')
            .pipe(
                catchError(this.handleError)
            );
    }

    private handleError(error: any) {
        console.error('An error occurred:', error);
        return throwError(() => new Error('Something went wrong; please try again later.'));
    }
}