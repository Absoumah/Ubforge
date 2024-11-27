import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';
import { KanbanColumnComponent } from '../kanban-column/kanban-column.component';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [CommonModule, DragDropModule, KanbanColumnComponent],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  todoTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  TaskStatus = TaskStatus;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.taskService.getMyTasks().subscribe(tasks => {
      this.todoTasks = tasks.filter(task => task.status === TaskStatus.TODO);
      this.inProgressTasks = tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
      this.completedTasks = tasks.filter(task => task.status === TaskStatus.COMPLETED);
    });
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