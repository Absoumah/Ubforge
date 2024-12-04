import { Task } from "../../tasks/models/task.interface";
import { IssuePriority } from "./issue-priority.enum";

export interface Issue {
    id: number;
    title: string;
    category: string;
    description: string;
    reportedDate: Date;
    dueDate: Date;
    tasks: Task[];
    projectId: number;
    priority: IssuePriority;
}

export type IssueCategory = 'BugFix' | 'Feature' | 'Enhancement' | 'Documentation';