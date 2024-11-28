import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
  private initializeMockProjects(): void {
    const mockProjects: Project[] = [
      {
        id: 1,
        name: 'Project Alpha',
        url: 'http://example.com/alpha',
        category: 'Web',
        description: 'Description for Project Alpha',
        assignedUsers: [
          { id: 1, firstName: 'John', lastName: 'Doe' },
          { id: 2, firstName: 'Jane', lastName: 'Smith' }
        ],
        taskIds: [1, 3, 5, 7, 8], // Tasks from issue service and task service
        issueIds: [1, 3, 5] // Issues related to Project Alpha
      },
      {
        id: 2,
        name: 'Project Beta',
        url: 'http://example.com/beta',
        category: 'Mobile',
        description: 'Description for Project Beta',
        assignedUsers: [
          { id: 3, firstName: 'Alice', lastName: 'Johnson' }
        ],
        taskIds: [2, 4, 6], // Tasks from issue service and task service
        issueIds: [2, 4, 6] // Issues related to Project Beta
      }
    ];

    this.projectsSubject.next(mockProjects);
  }

  constructor() {
    this.initializeMockProjects();
  }

  projects$ = this.projectsSubject.asObservable();

  getProjects(): Observable<Project[]> {
    return this.projects$.pipe(
      catchError(this.handleError)
    );
  }

  getProjectById(id: number): Project | undefined {
    return this.projectsSubject.getValue().find(project => project.id === id);
  }

  addProject(project: Project): void {
    const projects = this.projectsSubject.getValue();
    this.projectsSubject.next([...projects, project]);
  }

  updateProject(updateProject: Project): void {
    const projects = this.projectsSubject.getValue().map((project) =>
      project.id === updateProject.id ? updateProject : project
    );
    this.projectsSubject.next(projects);
  }

  deleteProject(id: number): void {
    const projects = this.projectsSubject.getValue().filter((project) => project.id !== id);
    this.projectsSubject.next(projects);
  }

  getCategories(): string[] {
    return ['Web', 'Mobile', 'Desktop', 'Cloud'];
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}