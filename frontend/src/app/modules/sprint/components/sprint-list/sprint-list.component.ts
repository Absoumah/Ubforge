import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintItemComponent } from '../sprint-item/sprint-item.component';
import { SprintService } from '../../services/sprint.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { Sprint } from '../../models/sprint.interface';
import { Subscription, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';

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
    private router: Router,
    private toastService: ToastService,
    private dialogService: DialogService
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
          if (!projectId) return [];
          return this.sprintService.getSprintsByProject(projectId.toString());
        })
      )
      .subscribe(sprints => {
        this.sprints = sprints;
      });
  }

  onEdit(id: string): void {
    this.router.navigate(['/sprints/edit', id]);
  }

  async onDelete(id: string): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Sprint',
      message: 'Are you sure you want to delete this sprint? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      this.sprintService.deleteSprint(id);
      this.toastService.success('Sprint deleted successfully');
    } else {
      this.toastService.info('Sprint deletion cancelled');
    }
  }

  createSprint(): void {
    this.router.navigate(['/sprints/create']);
  }
}