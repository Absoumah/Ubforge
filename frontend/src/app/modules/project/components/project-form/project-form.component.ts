import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.scss']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  projectId!: number | null;
  isEditMode = false;
  categories: string[] = [];
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
    this.checkEditMode();
  }

  private initializeForm(): void {
    this.projectForm = this.fb.group({
      name: this.createNameControl(),
      url: this.createUrlControl(),
      category: this.createCategoryControl(),
      description: this.createDescriptionControl(),
      assignedUsers: this.createAssignedUsersArray()
    });
  }

  private createNameControl(): FormControl {
    return this.fb.control('', [Validators.required, Validators.maxLength(20)]);
  }

  private createUrlControl(): FormControl {
    return this.fb.control('', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+$/)]);
  }

  private createCategoryControl(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  private createDescriptionControl(): FormControl {
    return this.fb.control('', [Validators.required, Validators.maxLength(200)]);
  }

  private createAssignedUsersArray(): FormArray {
    return this.fb.array([]);
  }

  private loadCategories(): void {
    try {
      this.categories = this.projectService.getCategories();
    } catch (error) {
      this.handleError(error);
    }
  }

  private checkEditMode(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.projectId = Number(idParam);
      this.isEditMode = true;
      this.loadProject();
    }
  }

  private loadProject(): void {
    try {
      if (this.projectId !== undefined) {
        const project = this.projectService.getProjectById(this.projectId!);
        if (project) {
          this.projectForm.patchValue(project);
        } else {
          console.error('Project with Id: ', this.projectId, ' not found');
          this.router.navigate(['/projects']);
        }
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.toastService.error('Please fill all required fields correctly');
      return;
    }

    const project: Project = {
      id: this.projectId || Date.now(),
      ...this.projectForm.value
    };

    try {
      if (this.isEditMode) {
        this.projectService.updateProject(project);
        this.toastService.success('Project updated successfully');
      } else {
        this.projectService.addProject(project);
        this.toastService.success('Project created successfully');
      }
      this.router.navigate(['/projects']);
    } catch (error) {
      this.toastService.error('An error occurred while saving the project');
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
    this.errorMessage = 'An error occurred while processing your request. Please try again later.';
  }
}