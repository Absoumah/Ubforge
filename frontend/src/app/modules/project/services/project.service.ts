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
}
