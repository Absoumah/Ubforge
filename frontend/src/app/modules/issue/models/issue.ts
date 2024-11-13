// TODO : separate the task and issue model into separate files

import { Task } from "./task.interface";



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