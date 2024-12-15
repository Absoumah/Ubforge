export interface Comment {
    id: number;
    entityId: number; 
    entityType: string;
    content: string;
    author: string;
    createdAt: Date;
  }