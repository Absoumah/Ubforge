import { Component, Input, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Issue } from '../../models/issue';
import { Router } from '@angular/router';
import { TaskStatus } from '../../../tasks/models/task-status.enum';
import { TaskNavigatorComponent } from '../../../tasks/components/task-navigator/task-navigator.component';
import { CommentService } from '../../../../shared/services/comment/comment.service';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { PriorityBadgeComponent } from '../../../../shared/components/priority-badge/priority-badge.component';

@Component({
  selector: 'app-issue-item',
  standalone: true,
  imports: [CommonModule, TaskNavigatorComponent, PriorityBadgeComponent],
  templateUrl: './issue-item.component.html',
  styleUrls: ['./issue-item.component.scss']
})
export class IssueItemComponent implements OnInit, OnDestroy {
  @Input() issue!: Issue;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  @Output() taskStatusChange = new EventEmitter<{ issueId: number, taskId: number, status: TaskStatus }>();

  commentCount = 0;
  private destroy$ = new Subject<void>();

  constructor(
    private router: Router,
    private commentService: CommentService
  ) { }

  ngOnInit(): void {
    this.commentService.getComments(this.issue.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(comments => {
        this.commentCount = comments.length;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  getCompletedTasksCount(): number {
    return this.issue.tasks.filter(task => task.completed).length;
  }

  onIssueClick(): void {
    this.router.navigate(['/issues', this.issue.id]);
  }

  onTaskStatusChange(event: { taskId: number, status: TaskStatus }): void {
    const task = this.issue.tasks.find(t => t.id === event.taskId);
    if (task) {
      task.status = event.status;
      task.completed = event.status === TaskStatus.COMPLETED;
      this.taskStatusChange.emit({
        issueId: this.issue.id,
        taskId: event.taskId,
        status: event.status
      });
    }
  }
}