import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Release } from '../../models/release';

@Component({
  selector: 'app-release-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './release-item.component.html',
  styleUrls: ['./release-item.component.scss']
})
export class ReleaseItemComponent {
  @Input() release!: Release;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  constructor(private router: Router) { }

  onEdit(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.release.id);
  }

  onDelete(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.release.id);
  }

  onReleaseClick(): void {
    this.router.navigate(['/releases', this.release.id]);
  }
}