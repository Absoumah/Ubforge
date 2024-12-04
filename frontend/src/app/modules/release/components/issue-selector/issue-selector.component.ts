import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Issue } from '../../../issue/models/issue';
import { IssueService } from '../../../issue/services/issue.service';

@Component({
  selector: 'app-issue-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './issue-selector.component.html',
  styleUrls: ['./issue-selector.component.scss']
})
export class IssueSelectorComponent implements OnInit {
  @Input() projectId!: number;
  @Input() selectedIssueIds: number[] = [];
  @Output() issueSelectionChange = new EventEmitter<number[]>();

  projectIssues$!: Observable<Issue[]>;

  constructor(private issueService: IssueService) { }

  ngOnInit(): void {
    this.projectIssues$ = this.issueService.getIssuesByProject(this.projectId);
  }

  isSelected(issueId: number): boolean {
    return this.selectedIssueIds.includes(issueId);
  }

  toggleIssue(issueId: number): void {
    let newSelection: number[];
    if (this.isSelected(issueId)) {
      newSelection = this.selectedIssueIds.filter(id => id !== issueId);
    } else {
      newSelection = [...this.selectedIssueIds, issueId];
    }
    this.issueSelectionChange.emit(newSelection);
  }
}