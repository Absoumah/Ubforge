import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Release } from '../../models/release';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { SprintItemComponent } from '../../../sprint/components/sprint-item/sprint-item.component';
import { Subscription } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-release-detail',
  standalone: true,
  imports: [CommonModule, SprintItemComponent],
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0', overflow: 'hidden', opacity: '0' })),
      state('expanded', style({ height: '*', opacity: '1' })),
      transition('collapsed <=> expanded', [animate('200ms ease-in-out')])
    ])
  ]
})
export class ReleaseDetailComponent implements OnInit, OnDestroy {
  release?: Release;
  isSprintsExpanded = true;
  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private releaseService: ReleaseService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.loadRelease(id);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private loadRelease(id: number): void {
    this.subscription.add(
      this.releaseService.getReleaseById(id).subscribe({
        next: (release) => {
          this.release = release;
        },
        error: () => {
          this.toastService.error('Release not found');
          this.router.navigate(['/releases']);
        }
      })
    );
  }

  toggleSprints(): void {
    this.isSprintsExpanded = !this.isSprintsExpanded;
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
      this.releaseService.deleteRelease(this.release.id).subscribe({
        next: () => {
          this.toastService.success('Release deleted successfully');
          this.router.navigate(['/releases']);
        },
        error: () => {
          this.toastService.error('Failed to delete release');
        }
      });
    }
  }

  getProgressColor(): string {
    if (!this.release?.progress) return 'primary';
    const percentage = this.release.progress.percentage;
    if (percentage === 100) return 'success';
    if (percentage >= 70) return 'info';
    if (percentage >= 30) return 'warning';
    return 'danger';
  }
}