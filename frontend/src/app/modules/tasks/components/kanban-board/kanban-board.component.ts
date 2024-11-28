import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { Subscription, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanColumnComponent],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  TaskStatus = TaskStatus;
  private subscription?: Subscription;

  constructor(
    private taskService: TaskService,
    private projectStateService: ProjectStateService
  ) { }

  ngOnInit() {
    this.subscription = this.projectStateService.getActiveProjectId()
      .pipe(
        switchMap(projectId => {
          if (!projectId) return of([]);
          return this.taskService.getTasksByProject(projectId);
        })
      )
      .subscribe(tasks => {
        this.todoTasks = tasks.filter(task => task.status === TaskStatus.TODO);
        this.inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
        this.completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED);
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  onDrop(event: CdkDragDrop<Task[]>, newStatus: TaskStatus) {
    if (event.previousContainer === event.container) return;

    const task = event.previousContainer.data[event.previousIndex];
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    this.taskService.updateTaskStatus(task.id, newStatus).subscribe();
  }
}