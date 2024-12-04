import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Sprint } from '../../models/sprint.interface';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-sprint-item',
  standalone: true,
  imports: [CommonModule, DatePipe],
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