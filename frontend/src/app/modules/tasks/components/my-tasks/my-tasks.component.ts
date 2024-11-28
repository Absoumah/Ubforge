import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskItemComponent } from '../task-item/task-item.component';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { Subscription, switchMap, of, combineLatest, map } from 'rxjs';

@Component({
  selector: 'app-my-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit, OnDestroy {
  tasks: Task[] = [];
  private subscription?: Subscription;

  constructor(
    private taskService: TaskService,
    private projectStateService: ProjectStateService
  ) { }

  ngOnInit(): void {
    this.subscription = combineLatest([
      this.projectStateService.getActiveProjectId(),
      this.taskService.getMyTasks()
    ]).pipe(
      map(([projectId, tasks]) => {
        if (!projectId) return [];
        return tasks.filter(task => task.projectId === projectId);
      })
    ).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onStatusChange(event: { taskId: number, status: TaskStatus }): void {
    this.taskService.updateTaskStatus(event.taskId, event.status).subscribe();
  }
}