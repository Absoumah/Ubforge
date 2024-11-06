import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectItemComponent],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(private projectService: ProjectService, private router: Router) { }

  // Get all projects on init from the ProjectService
  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  // create a new project
  createProject(): void {
    this.router.navigate(['/project/create']);
  }

  // edit a project
  editProject(id: number): void {
    this.router.navigate(['/project/edit', id]);
  }

  // delete a project
  deleteProject(id: number): void {
    this.projectService.deleteProject(id);
  }


}
