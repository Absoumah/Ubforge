import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AssignedUser } from '../models/assigned-user.interface';
import { Task, TaskForm } from '../models/task.interface';
import { TaskPriority } from '../models/task-priority.enum';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    constructor(private fb: FormBuilder) { }

    createTaskForm(): FormGroup {
        return this.fb.group({
            id: [Date.now()],
            name: ['', [Validators.required, Validators.maxLength(100)]],
            description: [''],
            priority: [TaskPriority.MEDIUM, Validators.required],
            assignedTo: [[]],
            estimatedHours: [0, [Validators.required, Validators.min(0)]]
        });
    }

    getAvailableUsers(): Observable<AssignedUser[]> {
        // TODO: Replace with actual API call
        return of([
            { id: 1, firstName: 'John', lastName: 'Doe' },
            { id: 2, firstName: 'Jane', lastName: 'Smith' },
            { id: 3, firstName: 'Mike', lastName: 'Johnson' }
        ]);
    }

    mapFormToTask(formValue: TaskForm): Task {
        return {
            ...formValue,
            completed: false,
            assignedTo: [] // TODO: Map user IDs to actual users
        };
    }
}