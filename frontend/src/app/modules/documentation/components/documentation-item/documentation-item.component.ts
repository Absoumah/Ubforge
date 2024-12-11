import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Documentation } from '../../models/documentation';
import { MarkdownModule } from 'ngx-markdown';

@Component({
  selector: 'app-documentation-item',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './documentation-item.component.html',
  styleUrl: './documentation-item.component.scss'
})
export class DocumentationItemComponent {
  @Input() doc!: Documentation;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  isExpanded = false;

  constructor(private router: Router) { }

  onView(): void {
    this.router.navigate(['/documentation', this.doc.id]);
  }

  onEdit(): void {
    this.edit.emit(this.doc.id);
  }

  onDelete(): void {
    this.delete.emit(this.doc.id);
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }
}