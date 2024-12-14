// sprint.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Sprint, SprintStatus } from '../models/sprint.interface';
import { ProjectStateService } from '../../project/services/project-state.service';

@Injectable({
  providedIn: 'root'
})
export class SprintService {
  private sprintsSubject = new BehaviorSubject<Sprint[]>([]);
  sprints$ = this.sprintsSubject.asObservable();

  constructor(private projectStateService: ProjectStateService) {
    this.initializeMockSprints();
  }
  private initializeMockSprints(): void {
    const mockSprints: Sprint[] = [
      {
        id: 1, // Changed from string to number
        name: 'Sprint 1',
        projectId: 1, // Changed from string to number
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-15'),
        status: SprintStatus.COMPLETED,
        description: 'Initial sprint focusing on core features',
        tasks: [1, 2, 3], // Changed from strings to numbers
        issues: [1] // Changed from strings to numbers
      },
      {
        id: 2,
        name: 'Sprint 2',
        projectId: 1,
        startDate: new Date('2024-03-16'),
        endDate: new Date('2024-03-31'),
        status: SprintStatus.ACTIVE,
        description: 'Performance improvements and bug fixes',
        tasks: [4, 5],
        issues: [2, 3]
      }
    ];

    this.sprintsSubject.next(mockSprints);
  }

  getSprintsByProject(projectId: number): Observable<Sprint[]> {
    return this.sprints$.pipe(
      map(sprints => sprints.filter(sprint => sprint.projectId === projectId))
    );
  }

  getSprint(id: number): Observable<Sprint | undefined> {
    return this.sprints$.pipe(
      map(sprints => sprints.find(sprint => sprint.id === id))
    );
  }

  createSprint(sprint: Omit<Sprint, 'id'>): void {
    const sprints = this.sprintsSubject.getValue();
    const newSprint = {
      ...sprint,
      id: sprints.length + 1
    };
    this.sprintsSubject.next([...sprints, newSprint]);
  }

  updateSprint(updatedSprint: Sprint): void {
    const sprints = this.sprintsSubject.getValue().map(sprint =>
      sprint.id === updatedSprint.id ? updatedSprint : sprint
    );
    this.sprintsSubject.next(sprints);
  }

  deleteSprint(id: number): boolean {
    const currentSprints = this.sprintsSubject.getValue();
    const sprintExists = currentSprints.some(sprint => sprint.id === id);

    if (sprintExists) {
      const updatedSprints = currentSprints.filter(sprint => sprint.id !== id);
      this.sprintsSubject.next(updatedSprints);
      return true;
    }
    return false;
  }

  addTaskToSprint(sprintId: number, taskId: number): void {
    const sprints = this.sprintsSubject.getValue().map(sprint => {
      if (sprint.id === sprintId) {
        return {
          ...sprint,
          tasks: [...sprint.tasks, taskId]
        };
      }
      return sprint;
    });
    this.sprintsSubject.next(sprints);
  }

  removeTaskFromSprint(sprintId: number, taskId: number): void {
    const sprints = this.sprintsSubject.getValue().map(sprint => {
      if (sprint.id === sprintId) {
        return {
          ...sprint,
          tasks: sprint.tasks.filter(id => id !== taskId)
        };
      }
      return sprint;
    });
    this.sprintsSubject.next(sprints);
  }

  addIssueToSprint(sprintId: number, issueId: number): void {
    const sprints = this.sprintsSubject.getValue().map(sprint => {
      if (sprint.id === sprintId) {
        return {
          ...sprint,
          issues: [...sprint.issues, issueId]
        };
      }
      return sprint;
    });
    this.sprintsSubject.next(sprints);
  }

  removeIssueFromSprint(sprintId: number, issueId: number): void {
    const sprints = this.sprintsSubject.getValue().map(sprint => {
      if (sprint.id === sprintId) {
        return {
          ...sprint,
          issues: sprint.issues.filter(id => id !== issueId)
        };
      }
      return sprint;
    });
    this.sprintsSubject.next(sprints);
  }
}