import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Issue } from '../../models/issue';
import { IssueService } from '../../services/issue.service';
import { TaskItemComponent } from '../../../tasks/components/task-item/task-item.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { CommentListComponent } from '../../../../shared/components/comment-list/comment-list.component';
import { CommentFormComponent } from '../../../../shared/components/comment-form/comment-form.component';
import { Comment } from '../../../../shared/models/comment';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { CommentService } from '../../../../shared/services/comment/comment.service';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { PriorityBadgeComponent } from '../../../../shared/components/priority-badge/priority-badge.component';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, CommentListComponent, CommentFormComponent, PriorityBadgeComponent],
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit, OnDestroy {
  issue: Issue | undefined;
  comments$ = new BehaviorSubject<Comment[]>([]);
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private commentService: CommentService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.issue = this.issueService.getIssueById(id);

    if (this.issue) {
      this.commentService.getComments(this.issue.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(comments => {
          this.comments$.next(comments);
        });
    } else {
      this.toastService.error('Issue not found');
      this.router.navigate(['/issues']);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCommentSubmit(content: string): void {
    if (this.issue) {
      this.commentService.addComment(this.issue.id, {
        entityId: this.issue.id,
        content,
        author: 'Current User' // Replace with actual user
      });
      this.toastService.success('Comment added successfully');
    }
  }

  onCommentDelete(commentId: number): void {
    if (this.issue) {
      this.commentService.deleteComment(this.issue.id, commentId);
      this.toastService.success('Comment deleted successfully');
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