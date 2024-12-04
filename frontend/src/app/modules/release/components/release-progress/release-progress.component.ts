import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Release } from '../../models/release';

@Component({
  selector: 'app-release-progress',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './release-progress.component.html',
  styleUrls: ['./release-progress.component.scss']
})
export class ReleaseProgressComponent {
  @Input() release!: Release;

  getProgressColor(): string {
    const percentage = this.release.progress?.percentage || 0;
    if (percentage >= 75) return '#28a745';
    if (percentage >= 50) return '#17a2b8';
    if (percentage >= 25) return '#ffc107';
    return '#dc3545';
  }
}