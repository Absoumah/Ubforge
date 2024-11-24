import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IssueService } from '../../services/issue.service';
import { TaskService } from '../../../tasks/services/task.service';
import { Issue, IssueCategory } from '../../models/issue';
import { TaskForm } from '../../../tasks/models/task.interface';
import { ToastService } from '../../../../shared/services/toast.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../../../tasks/components/task-form/task-form.component';
import { dueDateValidator } from '../../validators/due-date.validator';

//TODO: REFACTORING

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
  isEditMode = false;
  issueId: number | null = null;
  errorMessage: string | null = null;
  minReportedDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 30 days ago
  maxReportedDate = new Date().toISOString().split('T')[0]; // today
  minDueDate = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // tomorrow
  maxDueDate = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]; // 1 year from now

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    const today = new Date().toISOString().split('T')[0]; // format today's date as YYYY-MM-DD

    this.issueForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      reportedDate: [today, [Validators.required]],
      dueDate: ['', [Validators.required]],
      tasks: this.fb.array([])
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
    const issue = this.issueService.getIssueById(id);
    if (issue) {
      // format dates as YYYY-MM-DD for the date inputs
      const formattedIssue = {
        ...issue,
        reportedDate: issue.reportedDate ? issue.reportedDate.toISOString().split('T')[0] : '',
        dueDate: issue.dueDate ? issue.dueDate.toISOString().split('T')[0] : ''
      };

      // update form with formatted values
      this.issueForm.patchValue(formattedIssue);

      const tasks = this.issueForm.get('tasks') as FormArray;
      tasks.clear();
      if (issue.tasks) {
        issue.tasks.forEach(task => {
          tasks.push(this.fb.group({
            id: [task.id],
            name: [task.name, Validators.required],
            description: [task.description],
            priority: [task.priority, Validators.required],
            assignedTo: [task.assignedTo.map(user => user.id)],
            estimatedHours: [task.estimatedHours],
            completed: [task.completed],
            status: [task.status],
            dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : ''
          }));
        });
      }
    }
  }

  addTask(): void {
    const tasks = this.issueForm.get('tasks') as FormArray;
    tasks.push(this.taskService.createTaskForm());
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
      tasks.at(index).patchValue(newValue, { emitEvent: false });
    }
  }

  get taskControls(): FormGroup[] {
    return (this.issueForm.get('tasks') as FormArray).controls as FormGroup[];
  }

  onSubmit(): void {
    if (this.issueForm.invalid) {
      this.toastService.error('Please fill all required fields correctly');
      return;
    }

    const issue: Issue = {
      id: this.issueId || Date.now(),
      ...this.issueForm.value,
      tasks: this.issueForm.value.tasks.map((task: TaskForm) => this.taskService.mapFormToTask(task))
    };

    console.log('Issue Data on Submit:', issue); // Log issue data on submit

    try {
      if (this.isEditMode) {
        this.issueService.updateIssue(issue);
        this.toastService.success('Issue updated successfully');
      } else {
        this.issueService.addIssue(issue);
        this.toastService.success('Issue created successfully');
      }
      this.router.navigate(['/issues']);
    } catch (error) {
      this.errorMessage = 'An error occurred while saving the issue.';
      this.toastService.error(this.errorMessage);
      console.error(error);
    }
  }
}