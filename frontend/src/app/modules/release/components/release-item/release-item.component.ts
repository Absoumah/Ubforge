import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Release } from '../../models/release';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { ReleaseService } from '../../services/release.service';

@Component({
  selector: 'app-release-item',
  standalone: true,
  imports: [CommonModule, ProgressBarComponent],
  templateUrl: './release-item.component.html',
  styleUrls: ['./release-item.component.scss']
})
export class ReleaseItemComponent implements OnInit {
  @Input() release!: Release;
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();

  progress: number = 0;

  constructor(private router: Router, private releaseService: ReleaseService) { }

  ngOnInit() {
    this.releaseService.calculateProgress(this.release.id)
      .subscribe(progress => this.progress = progress);
  }

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