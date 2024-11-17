import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/issue';
import { TaskItemComponent } from '../task-item/task-item.component';
import { Router } from '@angular/router';
import { TaskStatus } from '../../models/task-status.enum';

@Component({
  selector: 'app-issue-item',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.scss']
})
export class IssueItemComponent {
  @Input() issue!: Issue;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() taskStatusChange = new EventEmitter<{ issueId: number, taskId: number, status: TaskStatus }>();

  isTasksExpanded = false;

  constructor(private router: Router) { }

  toggleTasks(): void {
    this.isTasksExpanded = !this.isTasksExpanded;
  }

  getCompletedTasksCount(): number {
    return this.issue.tasks.filter(task => task.completed).length;
  }

  onIssueClick(): void {
    this.router.navigate(['/issues', this.issue.id]);
  }

  // handleContainerClick(event: MouseEvent): void {
  //   // Only navigate if the click was directly on the container
  //   // or on elements that are not interactive
  //   if ((event.target as HTMLElement).classList.contains('issue-item') ||
  //     (event.target as HTMLElement).classList.contains('issue-header') ||
  //     (event.target as HTMLElement).classList.contains('issue-description')) {
  //     this.onIssueClick();
  //   }
  // }

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