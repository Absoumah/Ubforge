import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { Comment } from '../../models/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private comments = new Map<number, Comment[]>();
  private commentsSubject = new BehaviorSubject<Map<number, Comment[]>>(new Map());

  getComments(entityId: number): Observable<Comment[]> {
    return this.commentsSubject.pipe(
      map(comments => comments.get(entityId) || [])
    );
  }

  addComment(entityId: number, comment: Omit<Comment, 'id' | 'createdAt'>): void {
    const newComment: Comment = {
      ...comment,
      id: Date.now(),
      createdAt: new Date()
    };

    const entityComments = this.comments.get(entityId) || [];
    this.comments.set(entityId, [...entityComments, newComment]);
    this.commentsSubject.next(new Map(this.comments));
  }

  deleteComment(entityId: number, commentId: number): void {
    const entityComments = this.comments.get(entityId) || [];
    this.comments.set(
      entityId,
      entityComments.filter(c => c.id !== commentId)
    );
    this.commentsSubject.next(new Map(this.comments));
  }
}