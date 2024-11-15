import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskStatus } from '../../../modules/issue/models/task-status.enum';
import { ClickOutsideDirective } from '../../directives/click-outside.directive';

@Component({
  selector: 'app-status-dropdown',
  standalone: true,
  imports: [CommonModule, ClickOutsideDirective],
  templateUrl: './status-dropdown.component.html',
  styleUrls: ['./status-dropdown.component.scss']
})
export class StatusDropdownComponent {
  @Input() currentStatus!: TaskStatus;
  @Output() statusChange = new EventEmitter<TaskStatus>();

  statuses = Object.values(TaskStatus);
  isOpen = false;

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectStatus(status: TaskStatus): void {
    this.statusChange.emit(status);
    this.isOpen = false;
  }

  getStatusClass(status: TaskStatus): string {
    return `status-${status.toLowerCase()}`;
  }
}