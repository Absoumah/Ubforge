import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { Router } from '@angular/router';
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

  // TODO: hardcoded list for the categories
  categories = ['Web', 'Mobile', 'Desktop'];

  constructor(private fb: FormBuilder, private projectService: ProjectService, private router: Router) { }

  // initialize the form with empty values
  ngOnInit() {
    this.projectForm = this.fb.group({
      name: [''],
      description: [''],
      category: [''],
      budget: ['']
    })
  }

  // sumbit the form method 
  onSubmit() {
    // TODO: use other thing as id? 
    const newProject: Project = {
      id: Date.now(),
      ...this.projectForm.value,
    };

    this.projectService.addProject(newProject);
    this.router.navigate(['/projects']);
  }
}
