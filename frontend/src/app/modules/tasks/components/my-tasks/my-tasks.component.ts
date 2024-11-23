import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    // Assuming you have a method in TaskService to get user's tasks
    this.taskService.getMyTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onStatusChange(event: { taskId: number, status: TaskStatus }): void {
    // Handle status change
    this.taskService.updateTaskStatus(event.taskId, event.status).subscribe();
  }
}