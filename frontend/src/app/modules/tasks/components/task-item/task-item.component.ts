import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';
import { StatusDropdownComponent } from '../../../../shared/components/status-dropdown/status-dropdown.component';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent, StatusDropdownComponent],
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss']
})
export class TaskItemComponent {
  @Input() task!: Task;
  @Input() hideStatus: boolean = false;
  @Output() statusChange = new EventEmitter<{ taskId: number, status: TaskStatus }>();

  constructor(private router: Router, private taskService: TaskService) { }

  getPriorityClass(): string {
    return `priority-${this.task.priority.toLowerCase()}`;
  }

  onStatusChange(newStatus: TaskStatus): void {
    if (newStatus !== this.task.status) {
      this.taskService.updateTaskStatus(this.task.id, newStatus).subscribe();
    }
  }

  onTaskClick(): void {
    this.router.navigate(['/tasks', this.task.id]);
  }
}