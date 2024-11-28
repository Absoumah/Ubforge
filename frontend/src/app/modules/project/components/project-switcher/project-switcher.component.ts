import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Project } from '../../models/project.model';
import { ProjectService } from '../../services/project.service';
import { ProjectStateService } from '../../services/project-state.service';
import { ActiveProjectBadgeComponent } from '../active-project-badge/active-project-badge.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-switcher',
  standalone: true,
  imports: [CommonModule, ActiveProjectBadgeComponent],
  templateUrl: './project-switcher.component.html',
  styleUrls: ['./project-switcher.component.scss']
})
export class ProjectSwitcherComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  activeProjectId: number | null = null;
  private subscriptions = new Subscription();

  constructor(
    private projectService: ProjectService,
    private projectStateService: ProjectStateService
  ) { }

  ngOnInit() {
    this.subscriptions.add(
      this.projectService.getProjects().subscribe(projects => {
        this.projects = projects;
      })
    );

    this.subscriptions.add(
      this.projectStateService.getActiveProjectId().subscribe(id => {
        this.activeProjectId = id;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  setActiveProject(project: Project) {
    const newId = project.id === this.activeProjectId ? null : project.id;
    this.projectStateService.setActiveProject(newId);
  }
}