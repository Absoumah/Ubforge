import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectStateService {
  private activeProjectId = new BehaviorSubject<number | null>(null);

  setActiveProject(projectId: number | null): void {
    this.activeProjectId.next(projectId);
  }

  getActiveProjectId(): Observable<number | null> {
    return this.activeProjectId.asObservable();
  }
}