import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private apiUrl = 'http://localhost:8081/issue';
  private issuesSubject = new BehaviorSubject<Issue[]>([]);

  constructor(private http: HttpClient) {
    this.loadIssues();
  }

  private loadIssues(): void {
    this.http.get<Issue[]>(`${this.apiUrl}/getAll`).pipe(
      map(issues => issues.filter(issue => issue !== null)),
      tap(issues => this.issuesSubject.next(issues)),
      catchError(this.handleError)
    ).subscribe();
  }

  getIssues(): Observable<Issue[]> {
    return this.issuesSubject.asObservable();
  }

  getIssueById(id: number): Observable<Issue> {
    return this.http.get<Issue>(`${this.apiUrl}/get/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  getIssuesByProject(projectId: number): Observable<Issue[]> {
    return this.issuesSubject.pipe(
      map(issues => issues.filter(issue => issue?.projectId === projectId))
    );
  }

  addIssue(issue: Issue): Observable<Issue> {
    return this.http.post<Issue>(`${this.apiUrl}/create`, issue).pipe(
      tap(createdIssue => {
        if (createdIssue) {
          const issues = this.issuesSubject.value;
          this.issuesSubject.next([...issues, createdIssue]);
        }
      }),
      catchError(this.handleError)
    );
  }

  updateIssue(id: number, issue: Issue): Observable<Issue> {
    return this.http.put<Issue>(`${this.apiUrl}/update/${id}`, issue).pipe(
      tap(updatedIssue => {
        if (updatedIssue) {
          const issues = this.issuesSubject.value;
          const index = issues.findIndex(i => i.id === id);
          if (index !== -1) {
            issues[index] = updatedIssue;
            this.issuesSubject.next([...issues]);
          }
        }
      }),
      catchError(this.handleError)
    );
  }

  deleteIssue(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => {
        const issues = this.issuesSubject.value.filter(issue => issue.id !== id);
        this.issuesSubject.next(issues);
      }),
      catchError(this.handleError)
    );
  }

  assignIssueToUser(issueId: number, userId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/assignToUser/${issueId}/${userId}`, {}).pipe(
      catchError(this.handleError)
    );
  }

  getAssignedIssues(userId: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.apiUrl}/getAssignedToUser/${userId}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}