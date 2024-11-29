import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintItemComponent } from '../sprint-item/sprint-item.component';
import { SprintService } from '../../services/sprint.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { Sprint } from '../../models/sprint.interface';
import { Subscription, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [CommonModule, SprintItemComponent],
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit, OnDestroy {
  sprints: Sprint[] = [];
  private subscription?: Subscription;

  constructor(
    private sprintService: SprintService,
    private projectStateService: ProjectStateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadSprints();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  private loadSprints(): void {
    this.subscription = this.projectStateService.getActiveProjectId()
      .pipe(
        switchMap(projectId => {
          if (!projectId) {
            return [];
          }
          return this.sprintService.getSprintsByProject(projectId.toString());
        })
      )
      .subscribe(sprints => {
        this.sprints = sprints;
      });
  }

  createSprint(): void {
    this.router.navigate(['/sprints/create']);
  }

  onSprintDeleted(sprintId: string): void {
    this.sprintService.deleteSprint(sprintId);
  }
}