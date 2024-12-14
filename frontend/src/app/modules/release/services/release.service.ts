import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin, of } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { Release, ReleaseStatus } from '../models/release';
import { ProjectStateService } from '../../project/services/project-state.service';
import { SprintService } from '../../sprint/services/sprint.service';

@Injectable({
  providedIn: 'root'
})
export class ReleaseService {
  private readonly apiUrl = 'http://localhost:8081/release';
  private readonly releasesSubject = new BehaviorSubject<Release[]>([]);
  releases$ = this.releasesSubject.asObservable();

  constructor(
    private readonly http: HttpClient,
    private projectStateService: ProjectStateService,
    private readonly sprintService: SprintService
  ) {
    this.loadReleases();
  }

  private loadReleases(): void {
    this.http.get<Release[]>(`${this.apiUrl}/getAll`).subscribe({
      next: (releases) => this.releasesSubject.next(releases),
      error: (err) => console.error('Failed to load releases', err)
    });
  }

  getReleases(): Observable<Release[]> {
    return this.releases$;
  }

  getReleaseById(id: number): Observable<Release> {
    return this.http.get<Release>(`${this.apiUrl}/get/${id}`);
  }

  addRelease(release: Omit<Release, 'id'>): Observable<Release> {
    return this.http.post<Release>(`${this.apiUrl}/create`, release).pipe(
      tap(newRelease => {
        const releases = this.releasesSubject.getValue();
        this.releasesSubject.next([...releases, newRelease]);
      })
    );
  }

  updateRelease(release: Release): Observable<Release> {
    return this.http.put<Release>(`${this.apiUrl}/update/${release.id}`, release).pipe(
      tap(updatedRelease => {
        const releases = this.releasesSubject.getValue().map(r => 
          r.id === updatedRelease.id ? updatedRelease : r
        );
        this.releasesSubject.next(releases);
      })
    );
  }

  deleteRelease(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete/${id}`).pipe(
      tap(() => {
        const releases = this.releasesSubject.getValue().filter(r => r.id !== id);
        this.releasesSubject.next(releases);
      })
    );
  }

  addSprintToRelease(releaseId: number, sprintId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${releaseId}/addSprint/${sprintId}`, {}).pipe(
      tap(() => this.updateReleaseProgress(releaseId))
    );
  }

  removeSprintFromRelease(releaseId: number, sprintId: number): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${releaseId}/removeSprint/${sprintId}`, {}).pipe(
      tap(() => this.updateReleaseProgress(releaseId))
    );
  }
  calculateReleaseProgress(releaseId: number): Observable<{
    totalSprints: number;
    completedSprints: number;
    percentage: number;
  }> {
    return this.getReleaseById(releaseId).pipe(
      switchMap(release => {
        if (!release.sprintIds?.length) {
          return of({ totalSprints: 0, completedSprints: 0, percentage: 0 });
        }

        const sprintProgresses = release.sprintIds.map(sprintId => 
          this.sprintService.getSprintProgress(sprintId)
        );

        return forkJoin(sprintProgresses).pipe(
          map(progresses => {
            const totalSprints = release.sprintIds.length;
            const completedSprints = progresses.filter(p => p === 100).length;
            const percentage = progresses.reduce((sum, curr) => sum + curr, 0) / totalSprints;

            return {
              totalSprints,
              completedSprints,
              percentage
            };
          })
        );
      })
    );
  }

  private updateReleaseProgress(releaseId: number): void {
    this.calculateReleaseProgress(releaseId).subscribe(progress => {
      this.getReleaseById(releaseId).subscribe(release => {
        if (release) {
          const updatedRelease = {
            ...release,
            progress,
            status: this.determineReleaseStatus(progress)
          };
          this.updateRelease(updatedRelease).subscribe();
        }
      });
    });
  }

  private determineReleaseStatus(progress: { percentage: number }): ReleaseStatus {
    if (progress.percentage === 0) return ReleaseStatus.PLANNED;
    if (progress.percentage === 100) return ReleaseStatus.RELEASED;
    if (progress.percentage > 0) return ReleaseStatus.IN_PROGRESS;
    return ReleaseStatus.DELAYED;
  }
}