import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BehaviorSubject, of } from 'rxjs';
import { IssueSelectorComponent } from './issue-selector.component';
import { IssueService } from '../../../issue/services/issue.service';
import { Issue } from '../../../issue/models/issue';
import { IssuePriority } from '../../../issue/models/issue-priority.enum';

describe('IssueSelectorComponent', () => {
  let component: IssueSelectorComponent;
  let fixture: ComponentFixture<IssueSelectorComponent>;
  let issueService: jasmine.SpyObj<IssueService>;
  
  const mockIssues: Issue[] = [
    {
      id: 1,
      title: 'Issue 1',
      category: 'BugFix',
      description: 'Test description',
      reportedDate: new Date(),
      dueDate: new Date(),
      tasks: [],
      projectId: 1,
      priority: IssuePriority.HIGH
    },
    {
      id: 2, 
      title: 'Issue 2',
      category: 'Feature',
      description: 'Test description 2',
      reportedDate: new Date(),
      dueDate: new Date(),
      tasks: [],
      projectId: 1,
      priority: IssuePriority.MEDIUM
    }
  ];

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('IssueService', ['getIssuesByProject']);
    spy.getIssuesByProject.and.returnValue(of(mockIssues));

    await TestBed.configureTestingModule({
      imports: [IssueSelectorComponent, HttpClientTestingModule],
      providers: [
        { provide: IssueService, useValue: spy }
      ]
    }).compileComponents();

    issueService = TestBed.inject(IssueService) as jasmine.SpyObj<IssueService>;
    fixture = TestBed.createComponent(IssueSelectorComponent);
    component = fixture.componentInstance;
    component.projectId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load project issues on init', () => {
    expect(issueService.getIssuesByProject).toHaveBeenCalledWith(1);
  });

  it('should check if issue is selected correctly', () => {
    component.selectedIssueIds = [1];
    expect(component.isSelected(1)).toBeTrue();
    expect(component.isSelected(2)).toBeFalse();
  });

  it('should toggle issue selection correctly', () => {
    const selectionSpy = spyOn(component.issueSelectionChange, 'emit');
    
    // Add issue
    component.toggleIssue(1);
    expect(selectionSpy).toHaveBeenCalledWith([1]);

    // Remove issue
    component.selectedIssueIds = [1];
    component.toggleIssue(1);
    expect(selectionSpy).toHaveBeenCalledWith([]);
  });

  it('should handle multiple issue selections', () => {
    const selectionSpy = spyOn(component.issueSelectionChange, 'emit');
    
    component.selectedIssueIds = [1];
    component.toggleIssue(2);
    expect(selectionSpy).toHaveBeenCalledWith([1, 2]);
  });
});
