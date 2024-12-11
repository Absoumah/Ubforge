import { Comment } from "../../../shared/models/comment";

export interface Documentation {
    id: number;
    title: string;
    content: string;           // Markdown content
    category: DocumentCategory;
    author: string;
    createdAt: Date;
    updatedAt: Date;
    projectId: number;
    status: DocumentStatus;
    tags?: string[];
    comments?: Comment[];
    version?: string;         // For versioning documentation
}

export enum DocumentCategory {
    TECHNICAL = 'TECHNICAL',
    USER_GUIDE = 'USER_GUIDE',
    API = 'API',
    RELEASE_NOTES = 'RELEASE_NOTES',
    GENERAL = 'GENERAL'
}

export enum DocumentStatus {
    DRAFT = 'DRAFT',
    IN_REVIEW = 'IN_REVIEW',
    PUBLISHED = 'PUBLISHED',
    ARCHIVED = 'ARCHIVED'
}