import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Documentation } from '../../models/documentation';
import { DocumentationService } from '../../services/documentation.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ConfirmationDialogComponent } from '../../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { DialogService } from '../../../../shared/services/dialog.service';

@Component({
  selector: 'app-documentation-view',
  standalone: true,
  imports: [CommonModule, MarkdownModule],
  templateUrl: './documentation-view.component.html',
  styleUrl: './documentation-view.component.scss'
})
export class DocumentationViewComponent implements OnInit {
  doc: Documentation | undefined;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private docService: DocumentationService,
    private toastService: ToastService,
    private dialogService: DialogService
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.doc = this.docService.getDocById(id);

    if (!this.doc) {
      this.toastService.error('Documentation not found');
      this.router.navigate(['/documentation']);
    }
  }

  onEdit(): void {
    this.router.navigate(['/documentation/edit', this.doc?.id]);
  }

  async onDelete(): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Documentation',
      message: 'Are you sure you want to delete this documentation? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed && this.doc) {
      this.docService.deleteDoc(this.doc.id);
      this.toastService.success('Documentation deleted successfully');
      this.router.navigate(['/documentation']);
    } else {
      this.toastService.info('Documentation deletion cancelled');
    }
  }
}