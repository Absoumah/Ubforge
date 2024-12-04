import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ProjectStateService } from '../services/project-state.service';
import { ToastService } from '../../../shared/services/toast.service';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectGuard implements CanActivate {
  constructor(
    private projectState: ProjectStateService,
    private router: Router,
    private toastService: ToastService
  ) { }

  canActivate() {
    return this.projectState.getActiveProjectId().pipe(
      take(1),
      map(projectId => {
        if (!projectId) {
          this.toastService.error('Please select a project first');
          this.router.navigate(['/projects']);
          return false;
        }
        return true;
      })
    );
  }
}