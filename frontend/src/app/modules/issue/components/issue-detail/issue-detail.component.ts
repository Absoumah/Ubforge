import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { TaskItemComponent } from '../task-item/task-item.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [CommonModule, TaskItemComponent],
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit {
  issue: Issue | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.issue = this.issueService.getIssueById(id);
    if (!this.issue) {
      this.toastService.error('Issue not found');
      this.router.navigate(['/issues']);
    }
  }

  onEdit(): void {
    this.router.navigate(['/issues/edit', this.issue?.id]);
  }

  async onDelete(): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Issue',
      message: 'Are you sure you want to delete this issue? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed && this.issue) {
      this.issueService.deleteIssue(this.issue.id);
      this.toastService.success('Issue deleted successfully');
      this.router.navigate(['/issues']);
    } else {
      this.toastService.info('Issue deletion cancelled');
    }
  }
}