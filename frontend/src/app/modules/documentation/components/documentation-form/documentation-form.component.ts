// documentation-form.component.ts
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
  styleUrl: './documentation-form.component.scss'
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
    private projectStateService: ProjectStateService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.docForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      content: ['', [Validators.required]],
      category: [DocumentCategory.GENERAL, [Validators.required]],
      status: [DocumentStatus.DRAFT, [Validators.required]],
      tags: [''],
      version: [''],
      projectId: [this.projectStateService.getActiveProjectId()]
    });
  }

  private checkEditMode(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.docId = Number(idParam);
      this.isEditMode = true;
      this.loadDoc();
    }
  }

  private loadDoc(): void {
    if (this.docId) {
      const doc = this.docService.getDocById(this.docId);
      if (doc) {
        this.docForm.patchValue({
          ...doc,
          tags: doc.tags?.join(', ')
        });
      } else {
        this.toastService.error('Documentation not found');
        this.router.navigate(['/documentation']);
      }
    }
  }

  togglePreview(): void {
    this.previewMode = !this.previewMode;
  }

  onSubmit(): void {
    if (this.docForm.invalid) {
      this.toastService.error('Please fill all required fields correctly');
      return;
    }

    this.projectStateService.getActiveProjectId().pipe(take(1)).subscribe(projectId => {
      if (!projectId) {
        this.toastService.error('Please select a project first');
        return;
      }

      try {
        const formValue = this.docForm.value;
        const doc: Partial<Documentation> = {
          ...formValue,
          projectId, // Use the current active project ID
          tags: formValue.tags ? formValue.tags.split(',').map((tag: string) => tag.trim()) : [],
          author: 'Current User'
        };

        if (this.isEditMode && this.docId) {
          this.docService.updateDoc({ ...doc, id: this.docId } as Documentation);
          this.toastService.success('Documentation updated successfully');
        } else {
          this.docService.addDoc(doc as Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>);
          this.toastService.success('Documentation created successfully');
        }
        this.router.navigate(['/documentation']);
      } catch (error) {
        this.toastService.error('An error occurred while saving');
      }
    });
  }
}