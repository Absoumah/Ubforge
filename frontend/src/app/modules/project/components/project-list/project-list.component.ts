import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { ProjectItemComponent } from '../project-item/project-item.component';
import { Router, RouterModule } from '@angular/router';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, ProjectItemComponent, RouterModule],
  templateUrl: './project-list.component.html',
  styleUrl: './project-list.component.scss'
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(
    private projectService: ProjectService,
    private router: Router,
    private dialogService: DialogService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.projectService.getProjects().subscribe((projects) => {
      this.projects = projects;
    });
  }

  createProject(): void {
    this.router.navigate(['/projects/create']);
  }

  editProject(id: number): void {
    this.router.navigate(['/projects/edit', id]);
  }

  async deleteProject(id: number): Promise<void> {
    const confirmed = await this.dialogService.confirm({
      title: 'Delete Project',
      message: 'Are you sure you want to delete this project? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel'
    });

    if (confirmed) {
      this.projectService.deleteProject(id);
      this.toastService.success('Project deleted successfully');
    } else {
      this.toastService.info('Project deletion cancelled');
    }
  }
}