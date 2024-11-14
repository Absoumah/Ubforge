import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { IssueItemComponent } from '../issue-item/issue-item.component';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { PaginationComponent } from '../../../../shared/components/pagination/pagination.component';

@Component({
  selector: 'app-issue-list',
  standalone: true,
  imports: [CommonModule, IssueItemComponent, PaginationComponent],
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent implements OnInit {
  issues: Issue[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  totalPages: number = 1;

  constructor(
    private issueService: IssueService,
    private router: Router,
    private dialogService: DialogService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.loadIssues();
  }

  loadIssues(): void {
    this.toastService.info('Loading issues...');
    this.issueService.getIssues().subscribe(issues => {
      this.issues = issues;
      this.totalPages = Math.ceil(this.issues.length / this.itemsPerPage);
      this.toastService.success('Issues loaded successfully');
    });
  }

  get paginatedIssues(): Issue[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.issues.slice(startIndex, startIndex + this.itemsPerPage);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.toastService.info(`Navigated to page ${page}`);
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