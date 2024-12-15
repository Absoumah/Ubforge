export interface Release {
    id: number;
    version: string;
    name: string;
    description: string;
    releaseDate: string;
    status: string;
    projectId: number;
    sprintIds: number[];
    progress?: {
        totalSprints: number;
        completedSprints: number;
        percentage: number;
    };
}

export enum ReleaseStatus {
    PLANNED = 'PLANNED',
    IN_PROGRESS = 'IN_PROGRESS',
    RELEASED = 'COMPLETED',
    DELAYED = 'DELAYED'
}