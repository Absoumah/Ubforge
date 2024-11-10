import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, SharedModule],
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent {
  @Input() project!: Project;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  isDescriptionExpanded = false;

  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  getUserInitials(user: { firstName: string; lastName: string }): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
}