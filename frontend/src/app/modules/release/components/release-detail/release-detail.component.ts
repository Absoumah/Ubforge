import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../../models/release';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-release-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.scss']
})
export class ReleaseDetailComponent implements OnInit {
  release?: Release;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private releaseService: ReleaseService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.release = this.releaseService.getReleaseById(id);

    if (!this.release) {
      this.toastService.error('Release not found');
      this.router.navigate(['/releases']);
    }
  }

  onEdit(): void {
    this.router.navigate(['/releases/edit', this.release?.id]);
  }

  async onDelete(): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Release',
      message: 'Are you sure you want to delete this release? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed && this.release) {
      this.releaseService.deleteRelease(this.release.id);
      this.toastService.success('Release deleted successfully');
      this.router.navigate(['/releases']);
    } else {
      this.toastService.info('Release deletion cancelled');
    }
  }
}