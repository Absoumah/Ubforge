import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { AssignedUser } from '../models/assigned-user.interface';
import { Task, TaskForm } from '../models/task.interface';
import { TaskPriority } from '../models/task-priority.enum';
import { TaskStatus } from '../models/task-status.enum';

@Injectable({
    providedIn: 'root'
})
export class TaskService {
    private availableUsers: AssignedUser[] = [
        { id: 1, firstName: 'John', lastName: 'Doe' },
        { id: 2, firstName: 'Jane', lastName: 'Smith' },
        { id: 3, firstName: 'Mike', lastName: 'Johnson' }
    ];

    constructor(private fb: FormBuilder) { }

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

        console.log('Assigned Users:', assignedTo); // Log assigned users

        return {
            ...formValue,
            assignedTo,
            completed: false,
            status: formValue.status || TaskStatus.TODO,
            dueDate: formValue.dueDate || new Date()
        };
    }
}