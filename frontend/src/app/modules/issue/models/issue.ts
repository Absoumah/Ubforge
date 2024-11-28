// TODO : separate the task and issue model into separate files

import { Task } from "../../tasks/models/task.interface";



export interface Issue {
    id: number;
    title: string;
    category: string;
    description: string;
    reportedDate: Date;
    dueDate: Date;
    tasks: Task[];
    projectId: number;
}

export type IssueCategory = 'BugFix' | 'Feature' | 'Enhancement' | 'Documentation';