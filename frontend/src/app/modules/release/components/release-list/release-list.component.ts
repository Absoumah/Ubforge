import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Release } from '../../models/release';
import { ReleaseService } from '../../services/release.service';
import { ReleaseItemComponent } from '../release-item/release-item.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-release-list',
  standalone: true,
  imports: [CommonModule, ReleaseItemComponent],
  templateUrl: './release-list.component.html',
  styleUrls: ['./release-list.component.scss']
})
export class ReleaseListComponent {
  releases$: Observable<Release[]>;

  constructor(
    private releaseService: ReleaseService,
    private router: Router,
    private toastService: ToastService,
    private dialogService: DialogService
  ) {
    this.releases$ = this.releaseService.getReleases();
  }

  onEdit(id: number): void {
    this.router.navigate(['/releases/edit', id]);
  }

  async onDelete(id: number): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Release',
      message: 'Are you sure you want to delete this release? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      this.releaseService.deleteRelease(id).subscribe({
        next: () => {
          this.toastService.success('Release deleted successfully');
        },
        error: (error) => {
          console.error('Error deleting release:', error);
          this.toastService.error('Failed to delete release');
        }
      });
    } else {
      this.toastService.info('Release deletion cancelled');
    }
  }

  createRelease(): void {
    this.router.navigate(['/releases/new']);
  }
}