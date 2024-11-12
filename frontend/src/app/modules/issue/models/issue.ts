export interface Task {
    id: number;
    description: string;
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