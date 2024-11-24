import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject = new BehaviorSubject<Project[]>([]);
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