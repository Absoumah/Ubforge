import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { trigger, style, animate, transition } from '@angular/animations';
import { debounceTime, distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { TaskService } from '../../services/task.service';
import { TaskPriority } from '../../models/task-priority.enum';
import { AssignedUser } from '../../../issue/models/assigned-user.interface';
import { ProjectStateService } from '../../../project/services/project-state.service';

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
        animate('200ms ease-out', style({ opacity: 1, height: '*' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, height: 0 }))
      ])
    ])
  ]
})
export class TaskFormComponent implements OnInit, OnDestroy {
  @Input() taskGroup!: FormGroup;
  @Output() removeTask = new EventEmitter<void>();
  @Output() taskChange = new EventEmitter<FormGroup>();

  readonly priorities = Object.values(TaskPriority);
  availableUsers$: Observable<AssignedUser[]>;

  showDescription = false;
  showAssignment = false;
  showEstimation = false;

  private destroy$ = new Subject<void>();

  constructor(
    private taskService: TaskService,
    private projectStateService: ProjectStateService
  ) {
    this.availableUsers$ = this.taskService.getAvailableUsers();
  }

  ngOnInit(): void {
    // Set project ID when component initializes
    this.projectStateService.getActiveProjectId()
      .pipe(takeUntil(this.destroy$))
      .subscribe(projectId => {
        if (projectId) {
          this.taskGroup.patchValue({ projectId });
        }
      });

    // Monitor form changes
    this.taskGroup.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged((prev, curr) => JSON.stringify(prev) === JSON.stringify(curr)),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        console.log('Task Form Value Changes:', this.taskGroup.value);
        this.taskChange.emit(this.taskGroup);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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