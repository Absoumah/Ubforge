import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';

@Component({
  selector: 'app-task-detail',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.scss']
})
export class TaskDetailComponent implements OnInit {
  task?: Task;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTaskById(taskId).subscribe(task => {
      if (task) {
        this.task = task;
      } else {
        this.router.navigate(['/my-tasks']);
      }
    });
  }

  markAsDone(): void {
    if (this.task) {
      this.taskService.updateTaskStatus(this.task.id, TaskStatus.COMPLETED)
        .subscribe(() => {
          this.router.navigate(['tasks/my-tasks']);
        });
    }
  }

  onEdit(): void {
    if (this.task) {
      this.router.navigate(['/tasks', this.task.id, 'edit']);
    }
  }
}