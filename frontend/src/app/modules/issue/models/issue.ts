// TODO : separate the task and issue model into separate files

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH'
}

export interface AssignedUser {
    id: number;
    firstName: string;
    lastName: string;
}


export interface Task {
    id: number;
    name: string;
    description: string;
    priority: TaskPriority;
    assignedTo: AssignedUser[];
    estimatedHours: number;
    completed: boolean;
}

export interface Issue {
    id: number;
    title: string;
    category: string;
    description: string;
    reportedDate: Date;
    dueDate: Date;
    tasks: Task[];
}

export type IssueCategory = 'BugFix' | 'Feature' | 'Enhancement' | 'Documentation';