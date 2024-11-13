import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/issue';
import { TaskItemComponent } from '../task-item/task-item.component';

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

  isTasksExpanded = false;

  toggleTasks(): void {
    this.isTasksExpanded = !this.isTasksExpanded;
  }

  getCompletedTasksCount(): number {
    return this.issue.tasks.filter(task => task.completed).length;
  }
}