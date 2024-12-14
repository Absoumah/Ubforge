import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ReleaseStatus } from '../../models/release';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { take } from 'rxjs/operators';
import { SprintSelectorComponent } from '../../../sprint/components/sprint-selector/sprint-selector.component';

@Component({
  selector: 'app-release-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SprintSelectorComponent],
  templateUrl: './release-form.component.html',
  styleUrl: './release-form.component.scss'
})
export class ReleaseFormComponent implements OnInit {
  releaseForm: FormGroup;
  releaseStatuses = Object.values(ReleaseStatus);
  isEditMode = false;
  releaseId?: number;
  selectedSprintIds: number[] = [];
  minReleaseDate = new Date().toISOString().split('T')[0];
  maxReleaseDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];


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
      projectId: ['', [Validators.required]],
      sprintIds: [[]]
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
      this.releaseService.getReleaseById(this.releaseId).subscribe({
        next: (release) => {
          const formattedRelease = {
            ...release,
            releaseDate: release.releaseDate ? new Date(release.releaseDate).toISOString().split('T')[0] : ''
          };
          this.releaseForm.patchValue(formattedRelease);
          this.selectedSprintIds = release.sprintIds || [];
        },
        error: () => {
          this.toastService.error('Failed to load release');
          this.router.navigate(['/releases']);
        }
      });
    }
  }

  onSprintSelectionChange(sprintIds: number[]): void {
    this.selectedSprintIds = sprintIds;
    this.releaseForm.patchValue({ sprintIds });
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
      const formValue = this.releaseForm.value;
      const release = {
        ...formValue,
        id: this.isEditMode ? this.releaseId! : undefined,
        releaseDate: formValue.releaseDate ? new Date(formValue.releaseDate).toISOString().split('T')[0] : ''
      };

      const operation = this.isEditMode ?
        this.releaseService.updateRelease(release) :
        this.releaseService.addRelease(release);

      operation.subscribe({
        next: () => {
          this.toastService.success(`Release ${this.isEditMode ? 'updated' : 'created'} successfully`);
          this.router.navigate(['/releases']);
        },
        error: () => {
          this.toastService.error(`Failed to ${this.isEditMode ? 'update' : 'create'} release`);
        }
      });
    } else {
      this.toastService.error('Please fill all required fields correctly');
    }
  }
}