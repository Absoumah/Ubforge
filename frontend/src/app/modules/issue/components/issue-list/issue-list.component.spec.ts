import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { IssueListComponent } from './issue-list.component';
import { IssueService } from '../../services/issue.service';
import { of } from 'rxjs';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { FilterService } from '../../../../shared/services/filter.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { IssuePriority } from '../../models/issue-priority.enum';

describe('IssueListComponent', () => {
  let component: IssueListComponent;
  let fixture: ComponentFixture<IssueListComponent>;
  let issueService: jasmine.SpyObj<IssueService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let dialogService: jasmine.SpyObj<DialogService>;
  let filterService: jasmine.SpyObj<FilterService>;
  let projectStateService: jasmine.SpyObj<ProjectStateService>;

  beforeEach(async () => {
    const issueServiceSpy = jasmine.createSpyObj('IssueService', ['getIssues', 'deleteIssue', 'getIssuesByProject']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['info', 'success', 'error']);
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['confirm']);
    const filterServiceSpy = jasmine.createSpyObj('FilterService', [], { currentFilter$: of({ category: null, priority: null }) });
    const projectStateServiceSpy = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);

    await TestBed.configureTestingModule({
      imports: [IssueListComponent, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: IssueService, useValue: issueServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: FilterService, useValue: filterServiceSpy },
        { provide: ProjectStateService, useValue: projectStateServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueListComponent);
    component = fixture.componentInstance;
    issueService = TestBed.inject(IssueService) as jasmine.SpyObj<IssueService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    filterService = TestBed.inject(FilterService) as jasmine.SpyObj<FilterService>;
    projectStateService = TestBed.inject(ProjectStateService) as jasmine.SpyObj<ProjectStateService>;

    issueService.getIssues.and.returnValue(of([]));
    // filterService.currentFilter$ is already mocked with the desired value
    projectStateService.getActiveProjectId.and.returnValue(of(1));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter issues based on filter criteria', () => {
    component.issues = [
      { id: 1, title: 'Issue 1', category: 'BugFix', description: '', reportedDate: new Date(), dueDate: new Date(), tasks: [], projectId: 1, priority: 'HIGH' as IssuePriority },
      { id: 2, title: 'Issue 2', category: 'Feature', description: '', reportedDate: new Date(), dueDate: new Date(), tasks: [], projectId: 1, priority: 'LOW' as IssuePriority }
    ];
    component.filterIssues({ category: 'BugFix', priority: 'HIGH' });
    expect(component.filteredIssues.length).toBe(1);
    expect(component.filteredIssues[0].id).toBe(1);
  });

  it('should navigate to create issue page', () => {
    spyOn(component['router'], 'navigate').and.returnValue(Promise.resolve(true));
    component.createIssue();
    expect(component['router'].navigate).toHaveBeenCalledWith(['/issues/create']);
  });

  it('should navigate to edit issue page', () => {
    spyOn(component['router'], 'navigate').and.returnValue(Promise.resolve(true));
    component.editIssue(1);
    expect(component['router'].navigate).toHaveBeenCalledWith(['/issues/edit', 1]);
  });

  it('should delete issue after confirmation', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(true));
    issueService.deleteIssue.and.returnValue(of(void 0));
    spyOn(component, 'loadIssues');

    await component.deleteIssue(1);
    expect(dialogService.confirm).toHaveBeenCalled();
    expect(issueService.deleteIssue).toHaveBeenCalledWith(1);
    expect(component.loadIssues).toHaveBeenCalled();
  });

  it('should not delete issue if not confirmed', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(false));
    await component.deleteIssue(1);
    expect(issueService.deleteIssue).not.toHaveBeenCalled();
  });

  it('should paginate issues correctly', () => {
    component.filteredIssues = Array.from({ length: 10 }, (_, i) => ({ id: i + 1, title: `Issue ${i + 1}`, category: 'BugFix', description: '', reportedDate: new Date(), dueDate: new Date(), tasks: [], projectId: 1, priority: 'HIGH' as IssuePriority }));
    component.currentPage = 2;
    const paginatedIssues = component.paginatedIssues;
    expect(paginatedIssues.length).toBe(4);
    expect(paginatedIssues[0].id).toBe(5);
  });

  it('should change page and show toast message', () => {
    component.onPageChange(2);
    expect(component.currentPage).toBe(2);
    expect(toastService.info).toHaveBeenCalledWith('Navigated to page 2');
  });
});
