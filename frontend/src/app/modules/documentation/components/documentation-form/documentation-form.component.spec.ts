import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentationFormComponent } from './documentation-form.component';
import { DocumentationService } from '../../services/documentation.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { DocumentCategory, DocumentStatus } from '../../models/documentation';

describe('DocumentationFormComponent', () => {
  let component: DocumentationFormComponent;
  let fixture: ComponentFixture<DocumentationFormComponent>;
  let docService: DocumentationService;
  let toastService: ToastService;
  let projectStateService: ProjectStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DocumentationService,
        ToastService,
        ProjectStateService,
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationFormComponent);
    component = fixture.componentInstance;
    docService = TestBed.inject(DocumentationService);
    toastService = TestBed.inject(ToastService);
    projectStateService = TestBed.inject(ProjectStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.docForm.get('title')?.value).toBe('');
    expect(component.docForm.get('content')?.value).toBe('');
    expect(component.docForm.get('category')?.value).toBe(DocumentCategory.GENERAL);
    expect(component.docForm.get('status')?.value).toBe(DocumentStatus.DRAFT);
  });

  it('should toggle preview mode', () => {
    expect(component.previewMode).toBeFalse();
    component.togglePreview();
    expect(component.previewMode).toBeTrue();
  });

  it('should load documentation when in edit mode', () => {
    const mockDoc = {
      id: 1,
      title: 'Test Doc',
      content: 'Test Content',
      category: DocumentCategory.TECHNICAL,
      status: DocumentStatus.PUBLISHED,
      tags: ['test', 'doc'],
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: 1
    };

    spyOn(docService, 'getDocById').and.returnValue(of(mockDoc));
    component.docId = 1;
    component.loadDoc();

    expect(component.docForm.get('title')?.value).toBe(mockDoc.title);
    expect(component.docForm.get('content')?.value).toBe(mockDoc.content);
    expect(component.docForm.get('tags')?.value).toBe('test, doc');
  });

  it('should handle error when loading documentation fails', () => {
    spyOn(docService, 'getDocById').and.returnValue(throwError(() => new Error()));
    spyOn(toastService, 'error');
    
    component.docId = 1;
    component.loadDoc();

    expect(toastService.error).toHaveBeenCalledWith('Documentation not found');
  });

  it('should not submit if form is invalid', () => {
    spyOn(docService, 'addDoc');
    component.onSubmit();
    expect(docService.addDoc).not.toHaveBeenCalled();
  });

  it('should create new documentation when form is valid', () => {
    const mockProjectId = 1;
    spyOn(projectStateService, 'getActiveProjectId').and.returnValue(of(mockProjectId));
    spyOn(docService, 'addDoc').and.returnValue(of({
      id: 1,
      title: 'Test Doc',
      content: 'Test Content',
      category: DocumentCategory.TECHNICAL,
      status: DocumentStatus.DRAFT,
      tags: ['test', 'doc'],
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: 1
    }));
    spyOn(toastService, 'success');

    component.docForm.patchValue({
      title: 'Test Doc',
      content: 'Test Content',
      category: DocumentCategory.TECHNICAL,
      status: DocumentStatus.DRAFT,
      tags: 'test, doc'
    });

    component.onSubmit();

    expect(docService.addDoc).toHaveBeenCalled();
    expect(toastService.success).toHaveBeenCalledWith('Documentation created successfully');
  });
});
