import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Release, ReleaseStatus } from '../models/release';
import { ProjectStateService } from '../../project/services/project-state.service';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  private releases: Release[] = [];
  private releasesSubject = new BehaviorSubject<Release[]>([]);

  constructor(private projectStateService: ProjectStateService) {
    this.initializeMockReleases();
  }

  private initializeMockReleases(): void {
    const mockReleases: Release[] = [
      {
        id: 1,
        version: '1.0.0',
        name: 'Initial Release',
        description: 'First stable release with core features',
        releaseDate: '2024-04-01',
        status: ReleaseStatus.IN_PROGRESS,
        projectId: 1
      },
      {
        id: 2,
        version: '1.1.0',
        name: 'Feature Update',
        description: 'New features and improvements',
        releaseDate: '2024-05-15',
        status: ReleaseStatus.PLANNED,
        projectId: 1
      },
      {
        id: 3,
        version: '2.0.0',
        name: 'Major Update',
        description: 'Complete redesign and new architecture',
        releaseDate: '2024-06-30',
        status: ReleaseStatus.PLANNED,
        projectId: 2
      },
      {
        id: 4,
        version: '1.0.1',
        name: 'Bugfix Release',
        description: 'Critical bug fixes and performance improvements',
        releaseDate: '2024-03-15',
        status: ReleaseStatus.RELEASED,
        projectId: 2
      }
    ];

    this.releases = mockReleases;
    this.releasesSubject.next([...this.releases]);
  }

  getReleases(): Observable<Release[]> {
    return this.projectStateService.getActiveProjectId().pipe(
      map(projectId => {
        if (!projectId) return [];
        return this.releases.filter(release => release.projectId === projectId);
      })
    );
  }

  getReleaseById(id: number): Release | undefined {
    return this.releases.find(release => release.id === id);
  }

  addRelease(release: Release): void {
    const newRelease = {
      ...release,
      id: Date.now()
    };
    this.releases.push(newRelease);
    this.releasesSubject.next([...this.releases]);
  }

  updateRelease(updatedRelease: Release): void {
    const index = this.releases.findIndex(release => release.id === updatedRelease.id);
    if (index !== -1) {
      this.releases[index] = updatedRelease;
      this.releasesSubject.next([...this.releases]);
    }
  }

  deleteRelease(id: number): void {
    this.releases = this.releases.filter(release => release.id !== id);
    this.releasesSubject.next([...this.releases]);
  }
}