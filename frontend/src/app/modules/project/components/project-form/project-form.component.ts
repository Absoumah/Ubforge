import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
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

  // TODO: hardcoded list for the categories
  categories = ['Web', 'Mobile', 'Desktop'];

  constructor
    (
      private fb: FormBuilder,
      private projectService: ProjectService,
      private router: Router,
      private route: ActivatedRoute
    ) { }

  // initialize the form with empty values
  ngOnInit() {
    this.projectForm = this.fb.group({
      name: [''],
      url: [''],
      category: [''],
      description: [''],
    })

    // check if the form is in edit mode
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.projectId = +idParam;
        this.isEditMode = true;
        this.loadProject();
      }
    });
  }

  // load an existing project to edit
  loadProject() {
    const project = this.projectService.getProjectById(this.projectId!);
    if (project) {
      this.projectForm.patchValue(project);
    }
  }


  // sumbit the form method 
  onSubmit() {
    // if the form is in edit mode, update the project
    if (this.isEditMode) {
      const updatedProject: Project = {
        id: this.projectId!,
        ...this.projectForm.value,
      };
      this.projectService.updateProject(updatedProject);
    } else {

      // if the form is in create mode, create a new project
      // TODO: use other thing as id? 
      const newProject: Project = {
        id: Date.now(),
        ...this.projectForm.value,
      };
      this.projectService.addProject(newProject);
    }
    this.router.navigate(['/projects']);
  }
}
