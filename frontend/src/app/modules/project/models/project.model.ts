import { User } from "./user.model";

export interface Project {
    id: number;
    name: string;
    url: string;
    category: string;
    description: string;
    assignedUsers: User[];
}