import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SprintStatus } from '../../models/sprint.interface';
import { SprintService } from '../../services/sprint.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss']
})
export class SprintFormComponent implements OnInit {
  sprintForm: FormGroup;
  sprintStatuses = Object.values(SprintStatus);
  isEditMode = false;
  sprintId?: string;

  constructor(
    private fb: FormBuilder,
    private sprintService: SprintService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private projectStateService: ProjectStateService
  ) {
    this.sprintForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [''],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      status: [SprintStatus.PLANNED, [Validators.required]],
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
      this.sprintId = id;
      this.sprintService.getSprint(id).pipe(take(1)).subscribe(sprint => {
        if (sprint) {
          this.sprintForm.patchValue({
            ...sprint,
            startDate: sprint.startDate.toISOString().split('T')[0],
            endDate: sprint.endDate.toISOString().split('T')[0]
          });
        }
      });
    }
  }

  private setProjectId(): void {
    this.projectStateService.getActiveProjectId()
      .pipe(take(1))
      .subscribe(projectId => {
        if (projectId) {
          this.sprintForm.patchValue({ projectId: projectId.toString() });
        } else {
          this.toastService.error('Please select a project first');
          this.router.navigate(['/projects']);
        }
      });
  }

  onSubmit(): void {
    if (this.sprintForm.valid) {
      try {
        const sprintData = {
          ...this.sprintForm.value,
          startDate: new Date(this.sprintForm.value.startDate),
          endDate: new Date(this.sprintForm.value.endDate),
          tasks: this.isEditMode ? [] : [],
          issues: this.isEditMode ? [] : []
        };

        if (this.isEditMode && this.sprintId) {
          this.sprintService.updateSprint({ ...sprintData, id: this.sprintId });
          this.toastService.success('Sprint updated successfully');
        } else {
          this.sprintService.createSprint(sprintData);
          this.toastService.success('Sprint created successfully');
        }

        this.router.navigate(['/sprints']);
      } catch (error) {
        this.toastService.error('An error occurred while saving the sprint');
      }
    } else {
      this.toastService.error('Please fill all required fields correctly');
    }
  }
}