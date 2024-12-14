import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, EMPTY } from 'rxjs';
import { MarkdownModule } from 'ngx-markdown';
import { Documentation } from '../../models/documentation';
import { DocumentationService } from '../../services/documentation.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-documentation-view',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './documentation-view.component.html',
  styleUrl: './documentation-view.component.scss'
})
export class DocumentationViewComponent implements OnInit {
  doc$!: Observable<Documentation>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private docService: DocumentationService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.doc$ = this.docService.getDocById(id).pipe(
      catchError(error => {
        this.toastService.error('Documentation not found');
        this.router.navigate(['/documentation']);
        return EMPTY;
      })
    );
  }

  onEdit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.router.navigate(['/documentation/edit', id]);
  }

  async onDelete(): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Documentation',
      message: 'Are you sure you want to delete this documentation?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.docService.deleteDoc(id).subscribe({
        next: () => {
          this.toastService.success('Documentation deleted successfully');
          this.router.navigate(['/documentation']);
        },
        error: (error) => {
          this.toastService.error('Failed to delete documentation');
          console.error('Error deleting documentation:', error);
        }
      });
    }
  }
}