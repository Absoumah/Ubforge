import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DocumentationService } from './documentation.service';
import { ProjectStateService } from '../../project/services/project-state.service';
import { of } from 'rxjs';
import { Documentation, DocumentCategory, DocumentStatus } from '../models/documentation';

describe('DocumentationService', () => {
  let service: DocumentationService;
  let httpMock: HttpTestingController;
  let mockProjectStateService: jasmine.SpyObj<ProjectStateService>;

  const mockDoc: Documentation = {
    id: 1,
    title: 'Test Doc',
    content: 'Test Content',
    category: DocumentCategory.TECHNICAL,
    author: 'Test Author',
    createdAt: new Date(),
    updatedAt: new Date(),
    projectId: 1,
    status: DocumentStatus.PUBLISHED
  };

  beforeEach(() => {
    mockProjectStateService = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    mockProjectStateService.getActiveProjectId.and.returnValue(of(null));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    });
    service = TestBed.inject(DocumentationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get docs by project id', () => {
    const projectId = 1;
    const mockDocs = [mockDoc];

    service.getDocs(projectId).subscribe(docs => {
      expect(docs).toEqual(mockDocs);
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/documentation/project/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDocs);
  });

  it('should get doc by id', () => {
    const docId = 1;

    service.getDocById(docId).subscribe(doc => {
      expect(doc).toEqual(mockDoc);
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/documentation/${docId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDoc);
  });

  it('should add new doc', () => {
    const newDoc: Omit<Documentation, 'id' | 'createdAt' | 'updatedAt'> = {
      title: 'New Doc',
      content: 'New Content',
      category: DocumentCategory.TECHNICAL,
      author: 'Test Author',
      projectId: 1,
      status: DocumentStatus.DRAFT
    };

    service.addDoc(newDoc).subscribe(doc => {
      expect(doc).toEqual(mockDoc);
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/documentation/create`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newDoc);
    req.flush(mockDoc);
  });

  it('should update doc', () => {
    const docId = 1;
    const updatedDoc = { ...mockDoc, title: 'Updated Title' };

    service.updateDoc(docId, updatedDoc).subscribe(doc => {
      expect(doc).toEqual(updatedDoc);
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/documentation/${docId}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(updatedDoc);
    req.flush(updatedDoc);
  });

  it('should delete doc', () => {
    const docId = 1;

    service.deleteDoc(docId).subscribe(() => {
      expect(service.docs$).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:8081/api/documentation/${docId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
