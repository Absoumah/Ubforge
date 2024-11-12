import { TaskPriority } from './task-priority.enum';
import { AssignedUser } from './assigned-user.interface';

export interface Task {
    id: number;
    name: string;
    description: string;
    priority: TaskPriority;
    assignedTo: AssignedUser[];
    estimatedHours: number;
    completed: boolean;
}

export interface TaskForm {
    id: number;
    name: string;
    description: string;
    priority: TaskPriority;
    assignedTo: number[];
    estimatedHours: number;
}