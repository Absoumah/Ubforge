import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { IssueService } from '../../services/issue.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskService } from '../../services/task.service';
import { Issue, IssueCategory } from '../../models/issue';

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

  constructor(
    private fb: FormBuilder,
    private issueService: IssueService,
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.issueForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
      category: ['', Validators.required],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      reportedDate: [new Date().toISOString().split('T')[0], Validators.required],
      dueDate: ['', Validators.required],
      tasks: this.fb.array([])
    });
  }

  addTask(): void {
    const tasks = this.issueForm.get('tasks') as FormArray;
    tasks.push(this.taskService.createTaskForm());
  }

  onTaskChange(index: number, taskForm: FormGroup): void {
    const tasks = this.issueForm.get('tasks') as FormArray;
    // prevent recursion
    const currentValue = tasks.at(index).value;
    const newValue = taskForm.value;

    if (JSON.stringify(currentValue) !== JSON.stringify(newValue)) {
      tasks.at(index).patchValue(newValue, { emitEvent: false });
    }
  }


  removeTask(index: number): void {
    const tasks = this.issueForm.get('tasks') as FormArray;
    tasks.removeAt(index);
  }

  get taskControls(): FormGroup[] {
    return (this.issueForm.get('tasks') as FormArray).controls as FormGroup[];
  }

  onSubmit(): void {
    if (this.issueForm.invalid) return;

    const issue: Issue = {
      id: this.issueId || Date.now(),
      ...this.issueForm.value
    };

    try {
      if (this.isEditMode) {
        this.issueService.updateIssue(issue);
      } else {
        this.issueService.addIssue(issue);
      }
      this.router.navigate(['/issues']);
    } catch (error) {
      this.errorMessage = 'An error occurred while saving the issue.';
      console.error(error);
    }
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
      this.issueForm.patchValue(issue);
      issue.tasks.forEach(task => {
        const tasks = this.issueForm.get('tasks') as FormArray;
        tasks.push(this.fb.group(task));
      });
    }
  }
}