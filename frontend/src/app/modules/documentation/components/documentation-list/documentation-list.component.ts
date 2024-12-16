// documentation-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, EMPTY, of } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { DocumentationService } from '../../services/documentation.service';
import { Documentation } from '../../models/documentation';
import { DocumentationItemComponent } from '../documentation-item/documentation-item.component';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';

@Component({
  selector: 'app-documentation-list',
  standalone: true,
  imports: [CommonModule, DocumentationItemComponent],
  templateUrl: './documentation-list.component.html',
  styleUrls: ['./documentation-list.component.scss']
})
export class DocumentationListComponent implements OnInit {
  docs$: Observable<Documentation[]>;

  constructor(
    private docService: DocumentationService,
    private dialogService: DialogService,
    private toastService: ToastService,
    private router: Router,
    private projectStateService: ProjectStateService
  ) {
    this.docs$ = this.docService.docs$;
  }

  ngOnInit(): void {}

  createDoc(): void {
    this.router.navigate(['/documentation/create']);
  }

  onEdit(id: number): void {
    this.router.navigate(['/documentation/edit', id]);
  }

  async onDelete(id: number): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Documentation',
      message: 'Are you sure you want to delete this documentation?',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      this.docService.deleteDoc(id).subscribe({
        next: () => {
          this.toastService.success('Documentation deleted successfully');
        },
        error: (error) => {
          this.toastService.error('Failed to delete documentation');
          console.error('Error deleting documentation:', error);
        }
      });
    }
  }
}