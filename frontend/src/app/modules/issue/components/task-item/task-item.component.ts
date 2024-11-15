import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';
import { StatusDropdownComponent } from '../../../../shared/components/status-dropdown/status-dropdown.component';
import { ClickOutsideDirective } from '../../../../shared/directives/click-outside.directive';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, StatusDropdownComponent],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Output() statusChange = new EventEmitter<{ taskId: number, status: TaskStatus }>();

  getPriorityClass(): string {
    return `priority-${this.task.priority.toLowerCase()}`;
  }

  onStatusChange(newStatus: TaskStatus): void {
    if (newStatus !== this.task.status) {
      this.task.status = newStatus; // Update local state
      this.task.completed = newStatus === TaskStatus.COMPLETED;
      this.statusChange.emit({ taskId: this.task.id, status: newStatus });
    }
  }
}