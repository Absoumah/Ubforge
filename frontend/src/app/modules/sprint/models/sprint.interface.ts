export interface Sprint {
    id: number;
    name: string;
    projectId: number;
    startDate: Date;
    endDate: Date;
    status: SprintStatus;
    description?: string;
    tasks: number[];
    issues: number[];
}

export enum SprintStatus {
    PLANNED = 'PLANNED',
    ACTIVE = 'ACTIVE',
    COMPLETED = 'COMPLETED',
}