import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MarkdownModule } from 'ngx-markdown';
import { Documentation, DocumentCategory, DocumentStatus } from '../../models/documentation';
import { DocumentationService } from '../../services/documentation.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { take } from 'rxjs';

@Component({
  selector: 'app-documentation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MarkdownModule],
  templateUrl: './documentation-form.component.html',
  styleUrls: ['./documentation-form.component.scss'],
})
export class DocumentationFormComponent implements OnInit {
  docForm!: FormGroup;
  docId: number | null = null;
  isEditMode = false;
  categories = Object.values(DocumentCategory);
  statuses = Object.values(DocumentStatus);
  previewMode = false;

  constructor(
    private fb: FormBuilder,
    private docService: DocumentationService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private projectStateService: ProjectStateService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.docId = Number(idParam);
      this.isEditMode = true;
      this.loadDoc();
    }
  }

  togglePreview(): void {
    this.previewMode = !this.previewMode;
  }

  private initializeForm(): void {
    this.docForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      category: [DocumentCategory.GENERAL, [Validators.required]],
      status: [DocumentStatus.DRAFT, [Validators.required]],
      tags: [''],
      version: ['']
    });
  }

  private loadDoc(): void {
    if (this.docId) {
      this.docService.getDocById(this.docId).subscribe({
        next: (doc: Documentation) => {
          this.docForm.patchValue({
            ...doc,
            tags: doc.tags?.join(', ')
          });
        },
        error: () => {
          this.toastService.error('Documentation not found');
          this.router.navigate(['/documentation']);
        }
      });
    }
  }

  onSubmit(): void {
    if (this.docForm.invalid) return;

    const formValue = this.docForm.value;
    const doc = {
      ...formValue,
      tags: formValue.tags ? formValue.tags.split(',').map((t: string) => t.trim()) : []
    };

    this.projectStateService.getActiveProjectId().pipe(take(1)).subscribe(projectId => {
      if (!projectId) {
        this.toastService.error('Please select a project first');
        return;
      }

      const docWithProject = { ...doc, projectId };

      if (this.isEditMode && this.docId) {
        this.docService.updateDoc(this.docId, docWithProject).subscribe({
          next: () => {
            this.toastService.success('Documentation updated successfully');
            this.router.navigate(['/documentation']);
          },
          error: () => this.toastService.error('Failed to update documentation')
        });
      } else {
        this.docService.addDoc(docWithProject).subscribe({
          next: () => {
            this.toastService.success('Documentation created successfully');
            this.router.navigate(['/documentation']);
          },
          error: () => this.toastService.error('Failed to create documentation')
        });
      }
    });
  }
}