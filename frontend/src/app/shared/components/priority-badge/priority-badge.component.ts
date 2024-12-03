import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-priority-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './priority-badge.component.html',
  styleUrls: ['./priority-badge.component.scss']
})
export class PriorityBadgeComponent {
  @Input() priority!: string;

  getPriorityClass(): string {
    return `priority-${this.priority.toLowerCase()}`;
  }
}