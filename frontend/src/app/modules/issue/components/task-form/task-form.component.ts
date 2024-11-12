import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task, TaskPriority, AssignedUser } from '../../models/issue';

import { trigger, state, style, animate, transition } from '@angular/animations';


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
export class TaskFormComponent {
  @Input() taskGroup!: FormGroup;
  @Output() removeTask = new EventEmitter<void>();

  readonly priorities = Object.values(TaskPriority);
  showDescription = false;
  showAssignment = false;
  showEstimation = false;

  // TODO: Mock data - in real app would come from a service
  availableUsers: AssignedUser[] = [
    { id: 1, firstName: 'John', lastName: 'Doe' },
    { id: 2, firstName: 'Jane', lastName: 'Smith' },
    { id: 3, firstName: 'Mike', lastName: 'Johnson' }
  ];

  constructor() { }

  static createTaskForm(fb: FormBuilder): FormGroup {
    return fb.group({
      id: [Date.now()],
      name: ['', Validators.required],
      description: [''],
      priority: [TaskPriority.MEDIUM, Validators.required],
      assignedTo: [[]],
      estimatedHours: [0, [Validators.required, Validators.min(0)]]
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