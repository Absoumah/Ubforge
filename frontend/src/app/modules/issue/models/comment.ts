export interface Comment {
    id: number;
    issueId: number;
    content: string;
    author: string;
    createdAt: Date;
}