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
  ) { }

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
    if (!this.projectId) return;

    this.projectService.getProjectById(this.projectId).subscribe({
      next: (project) => {
        console.log('Loaded project:', project);
        if (project) {
          // Initialize form with project data
          this.projectForm.patchValue({
            name: project.name,
            url: project.url,
            category: project.category,
            description: project.description,
            assignedUsers: project.assignedUsers || []
          });
        } else {
          this.toastService.error('Project not found');
          this.router.navigate(['/projects']);
        }
      },
      error: (error) => {
        console.error('Error loading project:', error);
        this.handleError(error);
        this.toastService.error('Failed to load project');
        this.router.navigate(['/projects']);
      }
    });
  }


  onSubmit(): void {
    if (this.projectForm.invalid) {
      this.toastService.error('Please fill all required fields correctly');
      return;
    }

    const projectData: Partial<Project> = {
      ...this.projectForm.value
    };

    // Handle both edit and create cases
    const action$ = this.isEditMode ?
      this.projectService.updateProject({ ...projectData, id: this.projectId! } as Project) :
      this.projectService.addProject(projectData as Project);

    action$.subscribe({
      next: () => {
        this.toastService.success(
          this.isEditMode ? 'Project updated successfully' : 'Project created successfully'
        );
        this.router.navigate(['/projects']);
      },
      error: (error) => {
        console.error('Error saving project:', error);
        this.handleError(error);
        this.toastService.error(
          this.isEditMode ? 'Failed to update project' : 'Failed to create project'
        );
      }
    });
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
    this.errorMessage = 'An error occurred while processing your request. Please try again later.';
  }
}