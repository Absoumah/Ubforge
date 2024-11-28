import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Issue } from '../models/issue';
import { TaskPriority } from '../../tasks/models/task-priority.enum';
import { TaskStatus } from '../../tasks/models/task-status.enum';

@Injectable({
  providedIn: 'root'
})
export class IssueService {
  private issues: Issue[] = [];
  private issuesSubject = new BehaviorSubject<Issue[]>([]);

  private initializeMockIssues(): void {
    const mockIssues: Issue[] = [
      {
        id: 1,
        title: "Login Page Authentication Bug",
        description: "Users unable to login with correct credentials intermittently",
        category: "BugFix",
        reportedDate: new Date("2024-03-01"),
        dueDate: new Date("2024-03-15"),
        projectId: 1,
        tasks: [
          {
            id: 1,
            name: "Investigate login failures",
            description: "Check server logs for authentication errors",
            priority: TaskPriority.HIGH,
            status: TaskStatus.IN_PROGRESS,
            completed: false,
            assignedTo: [
              {
                id: 1,
                firstName: "John",
                lastName: "Doe"
              },
              {
                id: 2,
                firstName: "Jane",
                lastName: "Smith"
              },
              {
                id: 3,
                firstName: "Mike",
                lastName: "Johnson"
              }
            ],
            estimatedHours: 4,
            dueDate: new Date("2024-03-10"),
            projectId: 1
          },
          {
            id: 7,
            name: "Fix session timeout issue",
            description: "Ensure sessions do not expire prematurely",
            priority: TaskPriority.HIGH,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [
              {
                id: 1,
                firstName: "John",
                lastName: "Doe"
              }
            ],
            estimatedHours: 3,
            dueDate: new Date("2024-03-12"),
            projectId: 1
          },
          {
            id: 8,
            name: "Improve error messages",
            description: "Provide more descriptive error messages on login failure",
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [
              {
                id: 2,
                firstName: "Jane",
                lastName: "Smith"
              }
            ],
            estimatedHours: 2,
            dueDate: new Date("2024-03-14"),
            projectId: 1
          }
        ]
      },
      {
        id: 2,
        title: "Add Dark Mode Support",
        description: "Implement system-wide dark mode theme",
        category: "Feature",
        reportedDate: new Date("2024-03-02"),
        dueDate: new Date("2024-03-30"),
        projectId: 2,
        tasks: [
          {
            id: 2,
            name: "Create dark theme variables",
            description: "Define color palette for dark mode",
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 2, firstName: "Jane", lastName: "Smith" }],
            estimatedHours: 6,
            dueDate: new Date("2024-03-20"),
            projectId: 2
          }
        ]
      },
      {
        id: 3,
        title: "Performance Optimization",
        description: "Improve load times on the dashboard",
        category: "Enhancement",
        reportedDate: new Date("2024-03-03"),
        dueDate: new Date("2024-04-15"),
        projectId: 1,
        tasks: [
          {
            id: 3,
            name: "Profile dashboard performance",
            description: "Use Chrome DevTools to identify bottlenecks",
            priority: TaskPriority.HIGH,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 3, firstName: "Mike", lastName: "Johnson" }],
            estimatedHours: 8,
            dueDate: new Date("2024-04-01"),
            projectId: 1
          }
        ]
      },
      {
        id: 4,
        title: "API Documentation Update",
        description: "Update API docs with new endpoints",
        category: "Documentation",
        reportedDate: new Date("2024-03-04"),
        dueDate: new Date("2024-03-20"),
        projectId: 2,
        tasks: [
          {
            id: 4,
            name: "Document new endpoints",
            description: "Add OpenAPI specifications",
            priority: TaskPriority.LOW,
            status: TaskStatus.COMPLETED,
            completed: true,
            assignedTo: [{ id: 4, firstName: "Sarah", lastName: "Wilson" }],
            estimatedHours: 3,
            dueDate: new Date("2024-03-18"),
            projectId: 2
          }
        ]
      },
      {
        id: 5,
        title: "Mobile Responsive Layout",
        description: "Fix layout issues on mobile devices",
        category: "BugFix",
        reportedDate: new Date("2024-03-05"),
        dueDate: new Date("2024-03-25"),
        projectId: 1,
        tasks: [
          {
            id: 5,
            name: "Fix mobile navigation",
            description: "Address hamburger menu issues",
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.IN_PROGRESS,
            completed: false,
            assignedTo: [{ id: 5, firstName: "Alex", lastName: "Brown" }],
            estimatedHours: 5,
            dueDate: new Date("2024-03-22"),
            projectId: 1
          }
        ]
      },
      {
        id: 6,
        title: "User Settings Enhancement",
        description: "Add new preference options to user settings",
        category: "Feature",
        reportedDate: new Date("2024-03-06"),
        dueDate: new Date("2024-04-06"),
        projectId: 2,
        tasks: [
          {
            id: 6,
            name: "Design new settings UI",
            description: "Create mockups for new preferences",
            priority: TaskPriority.MEDIUM,
            status: TaskStatus.TODO,
            completed: false,
            assignedTo: [{ id: 6, firstName: "Emily", lastName: "Davis" }],
            estimatedHours: 7,
            dueDate: new Date("2024-03-28"),
            projectId: 2
          }
        ]
      }
    ];

    this.issues = mockIssues;
    this.issuesSubject.next([...this.issues]);
  }

  constructor() {
    this.initializeMockIssues();
  }

  getIssues(): Observable<Issue[]> {
    return this.issuesSubject.asObservable();
  }

  getIssueById(id: number): Issue | undefined {
    return this.issues.find(issue => issue.id === id);
  }

  getIssuesByProject(projectId: number): Observable<Issue[]> {
    return this.issuesSubject.pipe(
      map(issues => issues.filter(issue => issue.projectId === projectId))
    );
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