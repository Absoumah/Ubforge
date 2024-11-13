import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.interface';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;

  getPriorityClass(): string {
    return `priority-${this.task.priority.toLowerCase()}`;
  }

  getStatusClass(): string {
    return `status-${this.task.status.toLowerCase()}`;
  }
}
