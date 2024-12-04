import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../../models/release';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { IssueService } from '../../../issue/services/issue.service';
import { Issue } from '../../../issue/models/issue';
import { IssueItemComponent } from '../../../issue/components/issue-item/issue-item.component';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-release-detail',
  standalone: true,
  imports: [CommonModule, IssueItemComponent],
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({
        height: '0',
        overflow: 'hidden',
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
export class ReleaseDetailComponent implements OnInit {
  release?: Release;
  relatedIssues: Issue[] = [];
  isIssuesExpanded = false;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private releaseService: ReleaseService,
    private issueService: IssueService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.release = this.releaseService.getReleaseById(id);

    if (!this.release) {
      this.toastService.error('Release not found');
      this.router.navigate(['/releases']);
      return;
    }

    this.loadRelatedIssues();
  }

  toggleIssues(): void {
    this.isIssuesExpanded = !this.isIssuesExpanded;
  }

  private loadRelatedIssues(): void {
    if (this.release?.issueIds?.length) {
      this.issueService.getIssues().subscribe(issues => {
        this.relatedIssues = issues.filter(issue =>
          this.release?.issueIds?.includes(issue.id)
        );
      });
    }
  }

  onEdit(): void {
    this.router.navigate(['/releases/edit', this.release?.id]);
  }

  async onDelete(): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Release',
      message: 'Are you sure you want to delete this release? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed && this.release) {
      this.releaseService.deleteRelease(this.release.id);
      this.toastService.success('Release deleted successfully');
      this.router.navigate(['/releases']);
    } else {
      this.toastService.info('Release deletion cancelled');
    }
  }
}