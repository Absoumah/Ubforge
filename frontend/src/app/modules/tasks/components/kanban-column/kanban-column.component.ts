import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop } from '@angular/cdk/drag-drop';
import { Task } from '../../models/task.interface';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-kanban-column',
  standalone: true,
  imports: [CommonModule, DragDropModule, TaskItemComponent],
  templateUrl: './kanban-column.component.html',
  styleUrls: ['./kanban-column.component.scss']
})
export class KanbanColumnComponent {
  @Input() title!: string;
  @Input() tasks: Task[] = [];
  @Input() status!: string;
  @Input() listId!: string;
  @Input() connectedTo: string[] = [];
  @Output() dropped = new EventEmitter<CdkDragDrop<Task[]>>();

  onDrop(event: CdkDragDrop<Task[]>) {
    this.dropped.emit(event);
  }
}