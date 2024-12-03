export interface Sprint {
    id: string;
    name: string;
    projectId: string;
    startDate: Date;
    endDate: Date;
    status: SprintStatus;
    description?: string;
    tasks: string[];
    issues: string[];
}

export enum SprintStatus {
    PLANNED = 'planned',
    ACTIVE = 'active',
    COMPLETED = 'completed'
}