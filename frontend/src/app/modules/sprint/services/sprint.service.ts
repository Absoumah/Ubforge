import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Sprint, SprintStatus } from '../models/sprint.interface';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private apiUrl = 'http://localhost:8081/sprint';
  private sprintsSubject = new BehaviorSubject<Sprint[]>([]);
  sprints$ = this.sprintsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadSprints();
  }

  private loadSprints(): void {
    this.http.get<Sprint[]>(`${this.apiUrl}/getAll`).subscribe({
      next: (sprints) => this.sprintsSubject.next(sprints),
      error: (err) => console.error('Failed to load sprints', err)
    });
  }

  getSprintsByProject(projectId: number): Observable<Sprint[]> {
    return this.http.get<Sprint[]>(`${this.apiUrl}/project/${projectId}`).pipe(
      catchError(() => this.sprints$.pipe<Sprint[]>(
        map(sprints => sprints.filter(sprint => sprint.projectId === projectId))
      ))
    );
  }

  getSprint(id: number): Observable<Sprint> {
    return this.http.get<Sprint>(`${this.apiUrl}/get/${id}`).pipe(
      catchError(() => this.sprints$.pipe(
        map(sprints => sprints.find(sprint => sprint.id === id)),
        map(sprint => {
          if (!sprint) throw new Error('Sprint not found');
          return sprint;
        })
      ))
    );
  }

  createSprint(sprint: Omit<Sprint, 'id'>): Observable<Sprint> {
    return this.http.post<Sprint>(`${this.apiUrl}/create`, sprint).pipe(
      tap(newSprint => {
        const currentSprints = this.sprintsSubject.getValue();
        this.sprintsSubject.next([...currentSprints, newSprint]);
      })
    );
  }

  updateSprint(updatedSprint: Sprint): Observable<Sprint> {
    return this.http.put<Sprint>(`${this.apiUrl}/update/${updatedSprint.id}`, updatedSprint).pipe(
      tap(sprint => {
        const sprints = this.sprintsSubject.getValue().map(s => 
          s.id === sprint.id ? sprint : s
        );
        this.sprintsSubject.next(sprints);
      })
    );
  }

  deleteSprint(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => {
        const sprints = this.sprintsSubject.getValue().filter(s => s.id !== id);
        this.sprintsSubject.next(sprints);
      })
    );
  }

  addTaskToSprint(sprintId: number, taskId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${sprintId}/addTask/${taskId}`, {});
  }

  removeTaskFromSprint(sprintId: number, taskId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${sprintId}/removeTask/${taskId}`, {});
  }

  addIssueToSprint(sprintId: number, issueId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${sprintId}/addIssue/${issueId}`, {});
  }

  removeIssueFromSprint(sprintId: number, issueId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${sprintId}/removeIssue/${issueId}`, {});
  }

  getSprintProgress(id: number): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/progress/${id}`);
  }
}