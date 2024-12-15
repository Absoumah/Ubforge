import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssueItemComponent } from './issue-item.component';
import { Issue, IssueCategory } from '../../models/issue';
import { IssuePriority } from '../../models/issue-priority.enum';

describe('IssueItemComponent', () => {
  let component: IssueItemComponent;
  let fixture: ComponentFixture<IssueItemComponent>;

  const mockIssue: Issue = {
    id: 1,
    title: 'Test Issue',
    category: 'BugFix' as IssueCategory,
    description: 'Test Description',
    reportedDate: new Date(),
    dueDate: new Date(),
    tasks: [],
    priority: IssuePriority.HIGH,
    projectId: 123
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueItemComponent, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueItemComponent);
    component = fixture.componentInstance;
    component.issue = mockIssue;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});