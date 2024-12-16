import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IssueDetailComponent } from './issue-detail.component';
import { IssueService } from '../../services/issue.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { CommentService } from '../../../../shared/services/comment/comment.service';
import { Issue } from '../../models/issue';
import { IssuePriority } from '../../models/issue-priority.enum';
import { of, throwError } from 'rxjs';
import { TaskService } from '../../../tasks/services/task.service';


describe('IssueDetailComponent', () => {
  let component: IssueDetailComponent;
  let fixture: ComponentFixture<IssueDetailComponent>;
  let router: Router;

  const mockIssue: Issue = {
    id: 1,
    title: 'Test Issue',
    category: 'BugFix',
    description: 'Test Description', 
    reportedDate: new Date(),
    dueDate: new Date(),
    tasks: [],
    projectId: 123,
    priority: IssuePriority.HIGH
  };

  const mockComments = [
    { id: 1, content: 'Test comment', author: 'User1', entityId: 1, entityType: 'issue', createdAt: new Date() },
    { id: 2, content: 'Another comment', author: 'User2', entityId: 1, entityType: 'issue', createdAt: new Date() }
  ];

  const mockIssueService = {
    getIssueById: jasmine.createSpy('getIssueById').and.returnValue(of(mockIssue)),
    deleteIssue: jasmine.createSpy('deleteIssue').and.returnValue(of(void 0))
  };
  
  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
    info: jasmine.createSpy('info')
  };
  
  const mockDialogService = {
    confirm: jasmine.createSpy('confirm').and.returnValue(Promise.resolve(true))
  };

  const mockCommentService = {
    getCommentsByIssueId: jasmine.createSpy('getCommentsByIssueId').and.returnValue(of(mockComments)),
    addComment: jasmine.createSpy('addComment').and.returnValue(of(mockComments[0])),
    deleteComment: jasmine.createSpy('deleteComment').and.returnValue(of(void 0))
  };

  const mockTaskService = {
    getTasks: () => of([]),
    syncTasksWithIssue: () => {},
    updateTask: () => of({}),
    deleteTask: () => of(void 0)
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        { provide: IssueService, useValue: mockIssueService },
        { provide: ToastService, useValue: mockToastService },
        { provide: DialogService, useValue: mockDialogService },
        { provide: CommentService, useValue: mockCommentService },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: TaskService, useValue: mockTaskService }

      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle invalid issue ID', () => {
    const invalidRoute = {
      snapshot: { paramMap: convertToParamMap({ id: 'invalid' }) }
    };
    TestBed.inject(ActivatedRoute);
    const invalidComponent = new IssueDetailComponent(
      invalidRoute as any,
      router,
      mockIssueService as any,
      mockCommentService as any,
      mockToastService as any,
      mockDialogService as any, 
      mockTaskService as any
    );
    invalidComponent.ngOnInit();
    expect(mockToastService.error).toHaveBeenCalledWith('Invalid issue ID');
    expect(router.navigate).toHaveBeenCalledWith(['/issues']);
  });

  it('should handle issue load error', () => {
    mockIssueService.getIssueById.and.returnValue(throwError(() => new Error('Test error')));
    component.ngOnInit();
    expect(mockToastService.error).toHaveBeenCalledWith('Failed to load issue');
    expect(router.navigate).toHaveBeenCalledWith(['/issues']);
  });

  it('should delete comment successfully', async () => {
    await component.onCommentDelete(1);
    expect(mockCommentService.deleteComment).toHaveBeenCalledWith(1);
    expect(mockToastService.success).toHaveBeenCalledWith('Comment deleted successfully');
  });
});