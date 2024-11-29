// src/app/modules/release/components/release-form/release-form.component.ts
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReleaseStatus } from '../../models/release';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-release-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './release-form.component.html',
  styleUrl: './release-form.component.scss'
})
export class ReleaseFormComponent implements OnInit {
  releaseForm: FormGroup;
  releaseStatuses = Object.values(ReleaseStatus);
  isEditMode = false;
  releaseId?: number;

  constructor(
    private fb: FormBuilder,
    private releaseService: ReleaseService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private projectStateService: ProjectStateService
  ) {
    this.releaseForm = this.fb.group({
      version: ['', [Validators.required]],
      name: ['', [Validators.required]],
      description: [''],
      releaseDate: ['', [Validators.required]],
      status: [ReleaseStatus.PLANNED, [Validators.required]],
      projectId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.checkEditMode();
    this.setProjectId();
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.releaseId = +id;
      const release = this.releaseService.getReleaseById(this.releaseId);
      if (release) {
        this.releaseForm.patchValue(release);
      }
    }
  }

  private setProjectId(): void {
    this.projectStateService.getActiveProjectId()
      .pipe(take(1))
      .subscribe(projectId => {
        if (projectId) {
          this.releaseForm.patchValue({ projectId });
        } else {
          this.toastService.error('Please select a project first');
          this.router.navigate(['/projects']);
        }
      });
  }

  onSubmit(): void {
    if (this.releaseForm.valid) {
      try {
        const release = {
          ...this.releaseForm.value,
          id: this.isEditMode ? this.releaseId! : Date.now()
        };

        if (this.isEditMode) {
          this.releaseService.updateRelease(release);
          this.toastService.success('Release updated successfully');
        } else {
          this.releaseService.addRelease(release);
          this.toastService.success('Release created successfully');
        }

        this.router.navigate(['/releases']);
      } catch (error) {
        this.toastService.error('An error occurred while saving the release');
      }
    } else {
      this.toastService.error('Please fill all required fields correctly');
    }
  }
}