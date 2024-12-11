// sprint-item.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Sprint } from '../../models/sprint.interface';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

@Component({
  selector: 'app-sprint-item',
  standalone: true,
  imports: [CommonModule, DatePipe, ProgressBarComponent],
  templateUrl: './sprint-item.component.html',
  styleUrls: ['./sprint-item.component.scss']
})
export class SprintItemComponent {
  @Input() sprint!: Sprint;
  @Output() edit = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  constructor(private router: Router) { }

  get statusClass(): string {
    return this.sprint.status.toLowerCase();
  }

  get progress(): number {
    // This should come from the service, and the backend
    return Math.floor(0.5 * 100);
  }

  editSprint(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.sprint.id);
  }

  deleteSprint(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.sprint.id);
  }

  viewSprint(): void {
    this.router.navigate(['/sprints', this.sprint.id]);
  }
}