import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:8081/project';

  constructor(private http: HttpClient) { }

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/getAll`).pipe(
      catchError(this.handleError)
    );
  }

  getProjectById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/get/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  addProject(project: Project): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/create`, project).pipe(
      catchError(this.handleError)
    );
  }

  updateProject(project: Project): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/update/${project.id}`, project).pipe(
      catchError(this.handleError)
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getCategories(): string[] {
    return ['Web', 'Mobile', 'Desktop', 'Cloud'];
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}