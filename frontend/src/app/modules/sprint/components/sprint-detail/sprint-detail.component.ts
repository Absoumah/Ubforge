import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from '../../models/sprint.interface';
import { SprintService } from '../../services/sprint.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { TaskItemComponent } from '../../../tasks/components/task-item/task-item.component';

@Component({
  selector: 'app-sprint-detail',
  standalone: true,
  // imports: [CommonModule, TaskItemComponent],
  imports: [CommonModule],
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.scss']
})
export class SprintDetailComponent implements OnInit {
  sprint?: Sprint;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintService: SprintService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sprintService.getSprint(id).subscribe(sprint => {
        if (sprint) {
          this.sprint = sprint;
        } else {
          this.toastService.error('Sprint not found');
          this.router.navigate(['/sprints']);
        }
      });
    }
  }

  onEdit(): void {
    this.router.navigate(['/sprints/edit', this.sprint?.id]);
  }

  async onDelete(): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Sprint',
      message: 'Are you sure you want to delete this sprint? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed && this.sprint) {
      this.sprintService.deleteSprint(this.sprint.id);
      this.toastService.success('Sprint deleted successfully');
      this.router.navigate(['/sprints']);
    } else {
      this.toastService.info('Sprint deletion cancelled');
    }
  }
}