import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../../../shared/shared.module';
import { Project } from '../../models/project.model';
import { ActiveProjectBadgeComponent } from '../active-project-badge/active-project-badge.component';
import { ProjectStateService } from '../../services/project-state.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-item',
  standalone: true,
  imports: [CommonModule, SharedModule, ActiveProjectBadgeComponent],
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.scss']
})
export class ProjectItemComponent implements OnInit, OnDestroy {
  @Input() project!: Project;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  isDescriptionExpanded = false;
  isActive = false;
  private subscription?: Subscription;

  constructor(private projectStateService: ProjectStateService) { }

  ngOnInit() {
    this.subscription = this.projectStateService.getActiveProjectId()
      .subscribe(activeId => {
        this.isActive = activeId === this.project.id;
      });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  toggleActive() {
    const newActiveId = this.isActive ? null : this.project.id;
    this.projectStateService.setActiveProject(newActiveId);
  }

  toggleDescription() {
    this.isDescriptionExpanded = !this.isDescriptionExpanded;
  }

  getUserInitials(user: { firstName: string; lastName: string }): string {
    return `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  }
}