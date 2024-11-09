import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAvatarComponent } from '../user-avatar/user-avatar.component';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, UserAvatarComponent],
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


  //TODO: not sure that we should keep it here?? 
  getUserInitials(user: { firstName: string; lastName: string }): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
}