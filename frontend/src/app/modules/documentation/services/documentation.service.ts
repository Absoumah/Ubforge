import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Documentation } from '../models/documentation';
import { ProjectStateService } from '../../project/services/project-state.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  private apiUrl = 'http://localhost:8081/api/documentation';
  private docsSubject = new BehaviorSubject<Documentation[]>([]);
  docs$ = this.docsSubject.asObservable();

  constructor(
    private http: HttpClient,
    private projectStateService: ProjectStateService
  ) {
    this.loadDocs();
  }

  private loadDocs(): void {
    this.projectStateService.getActiveProjectId().subscribe(projectId => {
      if (projectId) {
        this.getDocs(projectId).subscribe();
      }
    });
  }

  getDocs(projectId: number): Observable<Documentation[]> {
    return this.http.get<Documentation[]>(`${this.apiUrl}/project/${projectId}`).pipe(
      tap(docs => this.docsSubject.next(docs))
    );
  }

  getDocById(id: number): Observable<Documentation> {
    return this.http.get<Documentation>(`${this.apiUrl}/${id}`);
  }

  addDoc(doc: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>): Observable<Documentation> {
    return this.http.post<Documentation>(`${this.apiUrl}/create`, doc).pipe(
      tap(() => this.loadDocs())
    );
  }

  updateDoc(id: number, doc: Documentation): Observable<Documentation> {
    return this.http.put<Documentation>(`${this.apiUrl}/${id}`, doc).pipe(
      tap(() => this.loadDocs())
    );
  }

  deleteDoc(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        const currentDocs = this.docsSubject.value;
        const updatedDocs = currentDocs.filter(doc => doc.id !== id);
        this.docsSubject.next(updatedDocs);
      })
    );
  }
}