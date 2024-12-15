import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SprintStatus } from '../../models/sprint.interface';
import { SprintService } from '../../services/sprint.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { IssueSelectorComponent } from '../../../release/components/issue-selector/issue-selector.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sprint-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IssueSelectorComponent],
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.scss']
})
export class SprintFormComponent implements OnInit {
  sprintForm: FormGroup;
  sprintStatuses = Object.values(SprintStatus);
  isEditMode = false;
  sprintId?: string;
  projectId?: number;
  selectedIssueIds: number[] = [];
  minStartDate = new Date().toISOString().split('T')[0];
  maxEndDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private sprintService: SprintService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private projectStateService: ProjectStateService
  ) {
    const today = new Date().toISOString().split('T')[0];

    this.sprintForm = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      startDate: [today, Validators.required],
      endDate: ['', Validators.required],
      status: [SprintStatus.PLANNED, Validators.required],
      projectId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.setProjectId();
    this.checkEditMode();
  }

  onIssueSelectionChange(issueIds: number[]): void {
    this.selectedIssueIds = issueIds;
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.sprintId = id;
      this.sprintService.getSprint(Number(id)).pipe(take(1)).subscribe(sprint => {
        if (sprint) {
          const formattedSprint = {
            ...sprint,
            startDate: sprint.startDate ? new Date(sprint.startDate).toISOString().split('T')[0] : '',
            endDate: sprint.endDate ? new Date(sprint.endDate).toISOString().split('T')[0] : '',
          };
          this.sprintForm.patchValue(formattedSprint);
          this.selectedIssueIds = sprint.issues.map(id => +id);
        }
      });
    }
  }

  private setProjectId(): void {
    this.projectStateService.getActiveProjectId()
      .pipe(take(1))
      .subscribe(projectId => {
        if (projectId) {
          this.projectId = +projectId;
          this.sprintForm.patchValue({ projectId: projectId.toString() });
        } else {
          this.toastService.error('Please select a project first');
          this.router.navigate(['/projects']);
        }
      });
  }

  onSubmit(): void {
    if (this.sprintForm.valid) {
      const formValue = this.sprintForm.value;
      const sprintData = {
        ...formValue,
        startDate: new Date(formValue.startDate).toISOString().split('T')[0],
        endDate: new Date(formValue.endDate).toISOString().split('T')[0],
        tasks: [],
        issues: this.selectedIssueIds
      };

      if (this.isEditMode && this.sprintId) {
        this.sprintService.updateSprint({ ...sprintData, id: Number(this.sprintId) })
          .subscribe({
            next: () => {
              this.toastService.success('Sprint updated successfully');
              this.router.navigate(['/sprints']);
            },
            error: () => this.toastService.error('Error updating sprint')
          });
      } else {
        this.sprintService.createSprint(sprintData)
          .subscribe({
            next: () => {
              this.toastService.success('Sprint created successfully');
              this.router.navigate(['/sprints']);
            },
            error: () => this.toastService.error('Error creating sprint')
          });
      }
    }
  }
}