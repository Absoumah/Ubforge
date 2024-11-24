import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { IssueFormComponent } from './issue-form.component';
import { IssueService } from '../../services/issue.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Issue } from '../../models/issue';

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
    tasks: []
  };

  const mockIssueService = {
    getIssueById: jasmine.createSpy('getIssueById').and.returnValue(of(mockIssue))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueFormComponent, ReactiveFormsModule],
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
        { provide: IssueService, useValue: mockIssueService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});