import { TaskPriority } from './task-priority.enum';
import { AssignedUser } from './assigned-user.interface';
import { TaskStatus } from './task-status.enum';

export interface Task {
    id: number;
    name: string;
    description: string;
    priority: TaskPriority;
    assignedTo: AssignedUser[];
    estimatedHours: number;
    completed: boolean;
    status: TaskStatus;
    dueDate: Date;
}


export interface TaskForm {
    id: number;
    name: string;
    description: string;
    priority: TaskPriority;
    assignedTo: number[];
    estimatedHours: number;
    status: TaskStatus;
    dueDate: Date;
}