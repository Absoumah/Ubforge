import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { IssueItemComponent } from './issue-item.component';
import { Issue, IssueCategory } from '../../models/issue';
import { IssuePriority } from '../../models/issue-priority.enum';
import { Router } from '@angular/router';
import { TaskStatus } from '../../../tasks/models/task-status.enum';
import { CommentService } from '../../../../shared/services/comment/comment.service';
import { of } from 'rxjs';
import { TaskPriority } from '../../../tasks/models/task-priority.enum';

describe('IssueItemComponent', () => {
  let component: IssueItemComponent;
  let fixture: ComponentFixture<IssueItemComponent>;
  let router: Router;
  let commentService: CommentService;

  const mockIssue: Issue = {
    id: 1,
    title: 'Test Issue',
    category: 'BugFix' as IssueCategory,
    description: 'Test Description',
    reportedDate: new Date(),
    dueDate: new Date(),
    tasks: [
      { id: 1, name: 'Task 1', description: '', priority: TaskPriority.MEDIUM, assignedTo: [], estimatedHours: 0, completed: true, status: TaskStatus.COMPLETED, dueDate: null, projectId: 123 },
      { id: 2, name: 'Task 2', description: '', priority: TaskPriority.MEDIUM, assignedTo: [], estimatedHours: 0, completed: false, status: TaskStatus.IN_PROGRESS, dueDate: null, projectId: 123 }
    ],
    priority: IssuePriority.HIGH,
    projectId: 123
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueItemComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        {
          provide: Router,
          useValue: { navigate: jasmine.createSpy('navigate') }
        },
        {
          provide: CommentService,
          useValue: { getCommentsByIssueId: () => of([{}, {}, {}]) }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    commentService = TestBed.inject(CommentService);
    component.issue = mockIssue;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load comment count on init', () => {
    expect(component.commentCount).toBe(3);
  });

  it('should navigate to issue details on issue click', () => {
    component.onIssueClick();
    expect(router.navigate).toHaveBeenCalledWith(['/issues', mockIssue.id]);
  });

  it('should emit edit event with issue id', () => {
    spyOn(component.edit, 'emit');
    component.edit.emit(mockIssue.id);
    expect(component.edit.emit).toHaveBeenCalledWith(mockIssue.id);
  });

  it('should emit delete event with issue id', () => {
    spyOn(component.delete, 'emit');
    component.delete.emit(mockIssue.id);
    expect(component.delete.emit).toHaveBeenCalledWith(mockIssue.id);
  });

  it('should return correct completed tasks count', () => {
    expect(component.getCompletedTasksCount()).toBe(1);
  });

  it('should handle task status change correctly', () => {
    spyOn(component.taskStatusChange, 'emit');
    const event = { taskId: 2, status: TaskStatus.COMPLETED };
    
    component.onTaskStatusChange(event);
    
    expect(component.issue.tasks[1].status).toBe(TaskStatus.COMPLETED);
    expect(component.issue.tasks[1].completed).toBeTrue();
    expect(component.taskStatusChange.emit).toHaveBeenCalledWith({
      issueId: mockIssue.id,
      taskId: event.taskId,
      status: event.status
    });
  });
});