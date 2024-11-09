import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule],
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
}