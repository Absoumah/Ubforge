import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comment } from '../../models/comment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private apiUrl = 'http://localhost:8081/comment'; // Update if different
  private commentsSubject = new BehaviorSubject<Comment[]>([]);

  constructor(private http: HttpClient) {}

  getCommentsByTaskId(taskId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/getByTaskId/${taskId}`);
  }

  getCommentsByIssueId(issueId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/getByIssueId/${issueId}`);
  }

  addComment(entityType: string, entityId: number, comment: Omit<Comment, 'id' | 'createdAt'>): Observable<Comment> {
    const payload = { ...comment, entityType, entityId };
    return this.http.post<Comment>(`${this.apiUrl}/add`, payload);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${commentId}`);
  }
}