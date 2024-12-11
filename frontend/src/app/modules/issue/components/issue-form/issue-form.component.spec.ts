import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { IssueFormComponent } from './issue-form.component';
import { IssueService } from '../../services/issue.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Issue } from '../../models/issue';
import { IssuePriority } from '../../models/issue-priority.enum';
import { ToastService } from '../../../../shared/services/toast.service';
import { TaskService } from '../../../tasks/services/task.service';
import { ProjectStateService } from '../../../project/services/project-state.service';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;

  const mockIssue: Issue = {
    id: 1,
    title: 'Test Issue',
    category: 'BugFix',
    description: 'Test Description',
    reportedDate: new Date(),
    dueDate: new Date(),
    tasks: [],
    projectId: 1,
    priority: IssuePriority.HIGH
  };

  const mockIssueService = {
    getIssueById: jasmine.createSpy('getIssueById').and.returnValue(mockIssue),
    addIssue: jasmine.createSpy('addIssue'),
    updateIssue: jasmine.createSpy('updateIssue')
  };

  const mockTaskService = {
    createTaskForm: jasmine.createSpy('createTaskForm').and.returnValue({})
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  const mockProjectStateService = {
    getActiveProjectId: jasmine.createSpy('getActiveProjectId').and.returnValue(of(1))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IssueFormComponent,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        provideRouter([]),
        { 
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        { provide: IssueService, useValue: mockIssueService },
        { provide: TaskService, useValue: mockTaskService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    
    // Wait for ngOnInit to complete
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    expect(component.issueForm).toBeDefined();
    expect(component.issueForm.get('title')).toBeTruthy();
    expect(component.issueForm.get('category')).toBeTruthy();
    expect(component.issueForm.get('priority')).toBeTruthy();
    expect(component.issueForm.get('description')).toBeTruthy();
  });

  it('should set project ID from ProjectStateService', () => {
    expect(mockProjectStateService.getActiveProjectId).toHaveBeenCalled();
    expect(component.issueForm.get('projectId')?.value).toBe(1);
  });
});