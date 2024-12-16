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
import { Task } from '../../../tasks/models/task.interface';
import { TaskService } from '../../../tasks/services/task.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-issue-detail',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, CommentListComponent, CommentFormComponent, PriorityBadgeComponent],
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.scss']
})
export class IssueDetailComponent implements OnInit, OnDestroy {
  issue: Issue | undefined;
  tasks: Task[] = [];
  comments: Comment[] = [];
  newCommentContent: string = '';
  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private issueService: IssueService,
    private commentService: CommentService,
    private toastService: ToastService,
    private dialogService: DialogService, 
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : null;

    if (id === null || isNaN(id)) {
      this.toastService.error('Invalid issue ID');
      this.router.navigate(['/issues']);
      return;
    }

    this.loadIssue(id);
  }

  private loadIssue(id: number): void {
    this.issueService.getIssueById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (issue) => {
          if (issue) {
            this.issue = issue;
            this.loadTasksForIssue(issue.id); // Load tasks for the issue
            this.loadComments(issue.id);
          } else {
            this.toastService.error('Issue not found');
            this.router.navigate(['/issues']);
          }
        },
        //code
        error: (err) => {
          console.error('Error fetching issue:', err);
          this.toastService.error('Failed to load issue');
          this.router.navigate(['/issues']);
        }
      });
  }

  private loadTasksForIssue(issueId: number): void {
    this.taskService.getTasks()
      .pipe(
        takeUntil(this.destroy$),
        map(tasks => tasks.filter(task => task.issueId === issueId))
      )
      .subscribe(tasks => {
        this.tasks = tasks;
      });
  }

  private loadComments(issueId: number): void {
    this.commentService.getCommentsByIssueId(issueId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (comments) => {
          this.comments = comments;
        },
        error: (err) => {
          console.error('Error fetching comments:', err);
          this.toastService.error('Failed to load comments');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onCommentSubmit(content: string): void {
    if (this.issue) {
      this.commentService.addComment('issue', this.issue.id, {
        content,
        author: 'Kejsi Stafa', // Replace with actual user
        entityId: this.issue.id,
        entityType: 'issue'
      }).pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (newComment) => {
            this.comments.push(newComment);
            this.toastService.success('Comment added successfully');
          },
          error: (error) => {
            console.error('Error adding comment:', error);
            this.toastService.error('Failed to add comment');
          }
        });
    }
  }

  onCommentDelete(commentId: number): void {
    this.commentService.deleteComment(commentId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.comments = this.comments.filter(comment => comment.id !== commentId);
          this.toastService.success('Comment deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting comment:', error);
          this.toastService.error('Failed to delete comment');
        }
      });
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
      this.issueService.deleteIssue(this.issue.id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastService.success('Issue deleted successfully');
            this.router.navigate(['/issues']);
          },
          error: (error) => {
            console.error('Error deleting issue:', error);
            this.toastService.error('Failed to delete issue');
          }
        });
    } else {
      this.toastService.info('Issue deletion cancelled');
    }
  }
}