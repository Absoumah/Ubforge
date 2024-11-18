import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.interface';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskStatus } from '../../models/task-status.enum';

@Component({
  selector: 'app-task-navigator',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './task-navigator.component.html',
  styleUrls: ['./task-navigator.component.scss']
})
export class TaskNavigatorComponent {
  @Input() tasks: Task[] = [];
  @Input() completedCount = 0;
  @Output() statusChange = new EventEmitter<{ taskId: number, status: TaskStatus }>();

  currentTaskIndex = 0;

  get canGoBack(): boolean {
    return this.currentTaskIndex > 0;
  }

  get canGoForward(): boolean {
    return this.currentTaskIndex < this.tasks.length - 1;
  }

  onPrevTask(): void {
    if (this.canGoBack) {
      this.currentTaskIndex--;
    }
  }

  onNextTask(): void {
    if (this.canGoForward) {
      this.currentTaskIndex++;
    }
  }

  onTaskStatusChange(event: { taskId: number, status: TaskStatus }): void {
    this.statusChange.emit(event);
  }
}