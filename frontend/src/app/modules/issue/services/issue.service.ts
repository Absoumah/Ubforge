import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Issue } from '../models/issue';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issues: Issue[] = [];
  private issuesSubject = new BehaviorSubject<Issue[]>([]);

  getIssues(): Observable<Issue[]> {
    return this.issuesSubject.asObservable();
  }

  getIssueById(id: number): Issue | undefined {
    return this.issues.find(issue => issue.id === id);
  }

  addIssue(issue: Issue): void {
    this.issues.push(issue);
    this.issuesSubject.next([...this.issues]);
  }

  updateIssue(updatedIssue: Issue): void {
    const index = this.issues.findIndex(issue => issue.id === updatedIssue.id);
    if (index !== -1) {
      this.issues[index] = updatedIssue;
      this.issuesSubject.next([...this.issues]);
    }
  }

  deleteIssue(id: number): void {
    this.issues = this.issues.filter(issue => issue.id !== id);
    this.issuesSubject.next([...this.issues]);
  }
}