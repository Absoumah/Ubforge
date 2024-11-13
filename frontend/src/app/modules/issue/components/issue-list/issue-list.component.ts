import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { Issue } from '../../models/issue';
import { IssueItemComponent } from '../issue-item/issue-item.component';

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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.issueService.getIssues().subscribe(issues => {
      this.issues = issues;
    });
  }

  createIssue(): void {
    this.router.navigate(['/issues/create']);
  }

  editIssue(id: number): void {
    this.router.navigate(['/issues/edit', id]);
  }

  deleteIssue(id: number): void {
    this.issueService.deleteIssue(id);
  }
}