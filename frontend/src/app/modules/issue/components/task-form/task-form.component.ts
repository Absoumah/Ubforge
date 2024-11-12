import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskPriority, AssignedUser } from '../../models/issue';

import { trigger, state, style, animate, transition } from '@angular/animations';
import { Observable } from 'rxjs';
import { TaskService } from '../../services/task.service';


@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ opacity: 0, height: 0 }),
        animate('200ms ease-out',
          style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in',
          style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class TaskFormComponent implements OnInit {
  @Input() taskGroup!: FormGroup;
  @Output() removeTask = new EventEmitter<void>();
  @Output() taskChange = new EventEmitter<FormGroup>();

  readonly priorities = Object.values(TaskPriority);
  availableUsers$: Observable<AssignedUser[]>;

  showDescription = false;
  showAssignment = false;
  showEstimation = false;

  constructor(private taskService: TaskService) {
    this.availableUsers$ = this.taskService.getAvailableUsers();
  }

  ngOnInit(): void {
    this.taskGroup.valueChanges.subscribe(() => {
      this.taskChange.emit(this.taskGroup);
    });
  }

  onRemove(): void {
    this.removeTask.emit();
  }

  toggleSection(section: 'description' | 'assignment' | 'estimation'): void {
    switch (section) {
      case 'description':
        this.showDescription = !this.showDescription;
        break;
      case 'assignment':
        this.showAssignment = !this.showAssignment;
        break;
      case 'estimation':
        this.showEstimation = !this.showEstimation;
        break;
    }
  }
}