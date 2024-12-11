import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { TaskService } from '../../../tasks/services/task.service';
import { Issue, IssueCategory } from '../../models/issue';
import { TaskFormComponent } from '../../../tasks/components/task-form/task-form.component';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { take } from 'rxjs/operators';
import { dueDateValidator } from '../../validators/due-date.validator';
import { IssuePriority } from '../../models/issue-priority.enum';
import { Task } from '../../../tasks/models/task.interface';
import { AssignedUser } from '../../models/assigned-user.interface';

@Component({
  selector: 'app-issue-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TaskFormComponent],
  templateUrl: './issue-form.component.html',
  styleUrls: ['./issue-form.component.scss']
})
export class IssueFormComponent implements OnInit {
  issueForm!: FormGroup;
  categories: IssueCategory[] = ['BugFix', 'Feature', 'Enhancement', 'Documentation'];
  priorities = Object.values(IssuePriority);
  isEditMode = false;
  issueId: number | null = null;
  errorMessage: string | null = null;
  minReportedDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  maxReportedDate = new Date().toISOString().split('T')[0];
  minDueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0];
  maxDueDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService,
    private projectStateService: ProjectStateService
  ) { }

  ngOnInit(): void {
    this.projectStateService.getActiveProjectId().pipe(take(1)).subscribe(projectId => {
      if (!projectId) {
        this.toastService.error('No active project selected');
        this.router.navigate(['/projects']);
        return;
      }
      this.initializeForm(projectId);
      this.checkEditMode();
    });
  }

  private initializeForm(projectId: number): void {
    const today = new Date().toISOString().split('T')[0];

    this.issueForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', Validators.required],
      priority: [IssuePriority.MEDIUM, Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      reportedDate: [today, [Validators.required]],
      dueDate: ['', [Validators.required]],
      tasks: this.fb.array([]),
      projectId: [projectId]
    });

    const reportedDateControl = this.issueForm.get('reportedDate');
    this.issueForm.get('dueDate')?.addValidators(dueDateValidator(reportedDateControl!));
  }

  private checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.issueId = +id;
      this.isEditMode = true;
      this.loadIssue(this.issueId);
    }
  }

  private loadIssue(id: number): void {
    this.issueService.getIssueById(id).subscribe(issue => {
      if (issue) {
        const formattedIssue = {
          ...issue,
          reportedDate: issue.reportedDate ? new Date(issue.reportedDate).toISOString().split('T')[0] : '',
          dueDate: issue.dueDate ? new Date(issue.dueDate).toISOString().split('T')[0] : ''
        };

        this.issueForm.patchValue(formattedIssue);

        const tasks = this.issueForm.get('tasks') as FormArray;
        tasks.clear();

        if (issue.tasks) {
          issue.tasks.forEach((task: Task) => {
            const taskForm = this.taskService.createTaskForm();
            taskForm.patchValue({
              ...task,
              projectId: issue.projectId,
              assignedTo: task.assignedTo.map((user: AssignedUser) => user.id),
              dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : ''
            });
            tasks.push(taskForm);
          });
        }
      }
    });
  }

  addTask(): void {
    const tasks = this.issueForm.get('tasks') as FormArray;
    const taskForm = this.taskService.createTaskForm();
    taskForm.patchValue({ projectId: this.issueForm.get('projectId')?.value });
    tasks.push(taskForm);
  }

  removeTask(index: number): void {
    const tasks = this.issueForm.get('tasks') as FormArray;
    tasks.removeAt(index);
  }

  onTaskChange(index: number, taskForm: FormGroup): void {
    const tasks = this.issueForm.get('tasks') as FormArray;
    const currentValue = tasks.at(index).value;
    const newValue = taskForm.value;

    if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
      tasks.at(index).patchValue(newValue);
    }
  }

  get taskControls(): FormGroup[] {
    return (this.issueForm.get('tasks') as FormArray).controls as FormGroup[];
  }

  onSubmit(): void {
    if (this.issueForm.valid) {
      const formValue = this.issueForm.value;
      const issue: Issue = {
        ...formValue,
        id: this.isEditMode ? this.issueId! : Date.now(),
        reportedDate: new Date(formValue.reportedDate),
        dueDate: new Date(formValue.dueDate)
      };

      if (this.isEditMode && this.issueId) {
        this.issueService.updateIssue(this.issueId, issue).subscribe(() => {
          this.toastService.success('Issue updated successfully');
          this.router.navigate(['/issues']);
        });
      } else {
        this.issueService.addIssue(issue).subscribe(() => {
          this.toastService.success('Issue created successfully');
          this.router.navigate(['/issues']);
        });
      }
    } else {
      this.errorMessage = 'Please fill in all required fields correctly.';
      this.toastService.error(this.errorMessage);
    }
  }
}