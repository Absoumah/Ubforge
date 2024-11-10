import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

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

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
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
    return this.fb.control('', [Validators.required, Validators.pattern('https?://.+')]);
  }

  private createCategoryControl(): FormControl {
    return this.fb.control('', [Validators.required]);
  }

  private createDescriptionControl(): FormControl {
    return this.fb.control('', [Validators.required, Validators.maxLength(500)]);
  }

  private createAssignedUsersArray(): FormArray {
    return this.fb.array([
      this.fb.group({ id: 1, firstName: 'John', lastName: 'Doe' }),
      this.fb.group({ id: 2, firstName: 'Jane', lastName: 'Smith' }),
      this.fb.group({ id: 3, firstName: 'Alice', lastName: 'Johnson' })
    ]);
  }

  private loadCategories(): void {
    this.categories = this.projectService.getCategories();
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
    if (this.projectId !== undefined) {
      const project = this.projectService.getProjectById(this.projectId!);
      if (project) {
        this.projectForm.patchValue(project);
      } else {
        console.error('Project with Id: ', this.projectId, ' not found');
        this.router.navigate(['/projects']);
      }
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) {
      console.error('Form is invalid');
      return;
    }

    const project: Project = {
      id: this.projectId || Date.now(),
      ...this.projectForm.value
    };

    if (this.isEditMode) {
      this.projectService.updateProject(project);
    } else {
      this.projectService.addProject(project);
    }

    this.router.navigate(['/projects']);
  }
}