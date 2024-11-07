import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projectsSubject: BehaviorSubject<Project[]> = new BehaviorSubject<Project[]>([]);
  projects$: Observable<Project[]> = this.projectsSubject.asObservable();

  constructor() { }


  //Get all projects
  getProjects(): Observable<Project[]> {
    return this.projects$;
  }

  //Get a project by id
  getProjectById(id: number): Project | undefined {
    return this.projectsSubject.getValue().find((project) => project.id === id);
  }

  //Add a new project
  addProject(project: Project): void {
    const projects = this.projectsSubject.getValue();
    this.projectsSubject.next([...projects, project]);
  }

  //Update a project
  updateProject(updateProject: Project): void {
    const projects = this.projectsSubject.getValue().map((project) =>
      project.id === updateProject.id ? updateProject : project
    );
    this.projectsSubject.next(projects);
  }

  //Delete a project
  deleteProject(id: number): void {
    const projects = this.projectsSubject.getValue().filter((project) => project.id !== id);
    this.projectsSubject.next(projects);
  }

  //Get the categories 
  //TODO: Hardcoded categories, should be fetched from the backend
  //TODO: This method should be moved to a separate service
  getCategories(): string[] {
    return ['Web', 'Mobile', 'Desktop', 'Cloud'];
  }
}
