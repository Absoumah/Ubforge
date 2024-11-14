import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { IssueItemComponent } from '../issue-item/issue-item.component';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, IssueItemComponent],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];

  constructor(
    private issueService: IssueService,
    private router: Router,
    private dialogService: DialogService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.issueService.getIssues().subscribe(issues => {
      this.issues = issues;
    });
  }

  createIssue(): void {
    this.router.navigate(['/issues/create']).then(() => {
      this.toastService.success('Navigated to create issue page');
    });
  }

  editIssue(id: number): void {
    this.router.navigate(['/issues/edit', id]).then(() => {
      this.toastService.success('Navigated to edit issue page');
    });
  }

  async deleteIssue(id: number): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Issue',
      message: 'Are you sure you want to delete this issue? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      this.issueService.deleteIssue(id);
      this.toastService.success('Issue deleted successfully');
    } else {
      this.toastService.info('Issue deletion cancelled');
    }
  }
}