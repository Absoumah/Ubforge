import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/issue';
import { Router } from '@angular/router';
import { TaskStatus } from '../../models/task-status.enum';
import { TaskNavigatorComponent } from '../task-navigator/task-navigator.component';

@Component({
  selector: 'app-issue-item',
  standalone: true,
  imports: [CommonModule, TaskNavigatorComponent],
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.scss']
})
export class IssueItemComponent {
  @Input() issue!: Issue;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() taskStatusChange = new EventEmitter<{ issueId: number, taskId: number, status: TaskStatus }>();

  constructor(private router: Router) { }

  getCompletedTasksCount(): number {
    return this.issue.tasks.filter(task => task.completed).length;
  }

  onIssueClick(): void {
    this.router.navigate(['/issues', this.issue.id]);
  }

  onTaskStatusChange(event: { taskId: number, status: TaskStatus }): void {
    const task = this.issue.tasks.find(t => t.id === event.taskId);
    if (task) {
      task.status = event.status;
      task.completed = event.status === TaskStatus.COMPLETED;
      this.taskStatusChange.emit({
        issueId: this.issue.id,
        taskId: event.taskId,
        status: event.status
      });
    }
  }
}