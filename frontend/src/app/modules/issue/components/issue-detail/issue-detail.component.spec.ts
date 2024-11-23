import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { IssueDetailComponent } from './issue-detail.component';
import { IssueService } from '../../services/issue.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { Issue } from '../../models/issue';

describe('IssueDetailComponent', () => {
  let component: IssueDetailComponent;
  let fixture: ComponentFixture<IssueDetailComponent>;

  const mockIssue: Issue = {
    id: 1,
    title: 'Test Issue',
    category: 'BugFix',
    description: 'Test Description',
    reportedDate: new Date(),
    dueDate: new Date(),
    tasks: []
  };

  const mockIssueService = {
    getIssueById: jasmine.createSpy('getIssueById').and.returnValue(mockIssue)
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  const mockDialogService = {
    confirm: jasmine.createSpy('confirm').and.returnValue(Promise.resolve(true))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueDetailComponent],
      providers: [
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
        { provide: ToastService, useValue: mockToastService },
        { provide: DialogService, useValue: mockDialogService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});