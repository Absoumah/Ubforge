import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-project-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './project-form.component.html',
  styleUrl: './project-form.component.scss'
})

export class ProjectFormComponent {
  projectForm!: FormGroup;
  projectId!: number | null;
  isEditMode = false;
  categories: string[] = [];

  constructor
    (
      private fb: FormBuilder,
      private projectService: ProjectService,
      private router: Router,
      private route: ActivatedRoute
    ) { }


  // initialize the component
  ngOnInit(): void {
    this.initializeForm();
    this.loadCategories();
    this.checkEditMode();
  }

  // initialize the form with empty values and validators
  private initializeForm(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      url: ['', [Validators.required, Validators.pattern('https?://.+')]],
      category: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
    })
  }

  // load the categories from the service
  private loadCategories(): void {
    this.categories = this.projectService.getCategories();
  }

  // check if the form is in edit mode
  private checkEditMode(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.projectId = Number(idParam);
      this.isEditMode = true;
      this.loadProject();
    }
  }

  // load an existing project to edit
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


  // sumbit the form method 
  onSubmit() {
    if (this.projectForm.invalid) {
      // TODO: handle the errors correctly and display them to the user
      console.error('Form is invalid');
      return;
    }

    // if the project exist update it, otherwise add a new project
    // using as Id the Date.now() value
    // TODO: this should be handled by the 
    // backend and the Id should be generated there ? 
    const project: Project = {
      id: this.projectId || Date.now(),
      ...this.projectForm.value
    };

    // update or add the project
    if (this.isEditMode) {
      this.projectService.updateProject(project);
    } else {
      this.projectService.addProject(project);
    }

    this.router.navigate(['/projects']);
  }
}
