// src/app/modules/issue/components/comment-list/comment-list.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment';

@Component({
  selector: 'app-comment-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss']
})
export class CommentListComponent {
  @Input() comments: Comment[] = [];
}