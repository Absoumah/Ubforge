import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Sprint } from '../../models/sprint.interface';
import { SprintService } from '../../services/sprint.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { IssueItemComponent } from '../../../issue/components/issue-item/issue-item.component';
import { Issue } from '../../../issue/models/issue';
import { IssueService } from '../../../issue/services/issue.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sprint-detail',
  standalone: true,
  imports: [CommonModule, IssueItemComponent],
  templateUrl: './sprint-detail.component.html',
  styleUrls: ['./sprint-detail.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        opacity: '0'
      })),
      state('expanded', style({
        height: '*',
        opacity: '1'
      })),
      transition('collapsed <=> expanded', [
        animate('200ms ease-in-out')
      ])
    ])
  ]
})
export class SprintDetailComponent implements OnInit {
  sprint?: Sprint;
  relatedIssues: Issue[] = [];
  isIssuesExpanded = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private sprintService: SprintService,
    private issueService: IssueService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.sprintService.getSprint(Number(id)).subscribe(sprint => {
        if (sprint) {
          this.sprint = sprint;
          this.loadRelatedIssues();
        } else {
          this.toastService.error('Sprint not found');
          this.router.navigate(['/sprints']);
        }
      });
    }
  }

  private loadRelatedIssues(): void {
    if (this.sprint?.issues?.length) {
      this.issueService.getIssues().subscribe(issues => {
        this.relatedIssues = issues.filter(issue =>
          this.sprint?.issues?.includes(issue.id)
        );
      });
    }
  }

  toggleIssues(): void {
    this.isIssuesExpanded = !this.isIssuesExpanded;
  }

  onEdit(): void {
    this.router.navigate(['/sprints/edit', this.sprint?.id]);
  }

  async onDelete(): Promise<void> {
    if (!this.sprint) return;

    const confirmed = await this.dialogService.confirm({
      title: 'Delete Sprint',
      message: 'Are you sure you want to delete this sprint?'
    });

    if (confirmed) {
      this.sprintService.deleteSprint(this.sprint.id).subscribe({
        next: () => {
          this.toastService.success('Sprint deleted successfully');
          this.router.navigate(['/sprints']);
        },
        error: () => this.toastService.error('Failed to delete sprint')
      });
    }
  }
}