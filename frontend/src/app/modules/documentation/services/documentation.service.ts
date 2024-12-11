import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Documentation, DocumentCategory, DocumentStatus } from '../models/documentation';
import { ProjectStateService } from '../../project/services/project-state.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentationService {
  private docsSubject = new BehaviorSubject<Documentation[]>([]);
  docs$ = this.docsSubject.asObservable();

  constructor(private projectStateService: ProjectStateService) {
    this.initializeMockDocs();
  }

  private initializeMockDocs(): void {
    const mockDocs: Documentation[] = [
      {
        id: 1,
        title: 'API Documentation',
        content: '# API Documentation\n\nThis document describes the REST API endpoints...',
        category: DocumentCategory.API,
        author: 'John Doe',
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-03-01'),
        projectId: 1,
        status: DocumentStatus.PUBLISHED,
        version: '1.0.0',
        tags: ['api', 'rest', 'endpoints']
      },
      {
        id: 2,
        title: 'User Guide',
        content: '# User Guide\n\nThis guide helps users navigate the application...',
        category: DocumentCategory.USER_GUIDE,
        author: 'Jane Smith',
        createdAt: new Date('2024-02-01'),
        updatedAt: new Date('2024-02-01'),
        projectId: 1,
        status: DocumentStatus.PUBLISHED,
        tags: ['guide', 'help']
      }
    ];

    this.docsSubject.next(mockDocs);
  }

  getDocs(): Observable<Documentation[]> {
    return this.projectStateService.getActiveProjectId().pipe(
      switchMap(activeProjectId => this.docs$.pipe(
        map(docs => docs.filter(doc => doc.projectId === activeProjectId))
      )),
      catchError(this.handleError)
    );
  }

  getDocById(id: number): Documentation | undefined {
    return this.docsSubject.getValue().find(doc => doc.id === id);
  }

  addDoc(doc: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'>): void {
    const docs = this.docsSubject.getValue();
    const newDoc: Documentation = {
      ...doc,
      id: Math.max(...docs.map(d => d.id), 0) + 1,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.docsSubject.next([...docs, newDoc]);
  }

  updateDoc(updatedDoc: Documentation): void {
    const docs = this.docsSubject.getValue().map(doc =>
      doc.id === updatedDoc.id ? { ...updatedDoc, updatedAt: new Date() } : doc
    );
    this.docsSubject.next(docs);
  }

  deleteDoc(id: number): void {
    const docs = this.docsSubject.getValue().filter(doc => doc.id !== id);
    this.docsSubject.next(docs);
  }

  getDocsByCategory(category: DocumentCategory): Observable<Documentation[]> {
    return this.docs$.pipe(
      map(docs => docs.filter(doc => doc.category === category))
    );
  }

  getDocsByStatus(status: DocumentStatus): Observable<Documentation[]> {
    return this.docs$.pipe(
      map(docs => docs.filter(doc => doc.status === status))
    );
  }

  searchDocs(query: string): Observable<Documentation[]> {
    return this.docs$.pipe(
      map(docs => docs.filter(doc =>
        doc.title.toLowerCase().includes(query.toLowerCase()) ||
        doc.content.toLowerCase().includes(query.toLowerCase()) ||
        doc.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      ))
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    return throwError(() => error);
  }
}