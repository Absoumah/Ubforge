import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Documentation } from '../../models/documentation';
import { DocumentationService } from '../../services/documentation.service';
import { ToastService } from '../../../../shared/services/toast.service';

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
    private toastService: ToastService
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

  onDelete(): void {
    if (this.doc) {
      this.docService.deleteDoc(this.doc.id);
      this.toastService.success('Documentation deleted successfully');
      this.router.navigate(['/documentation']);
    }
  }
}