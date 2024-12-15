import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SprintListComponent } from './sprint-list.component';
import { SprintService } from '../../services/sprint.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { Sprint, SprintStatus } from '../../models/sprint.interface';

describe('SprintListComponent', () => {
  let component: SprintListComponent;
  let fixture: ComponentFixture<SprintListComponent>;
  let sprintService: jasmine.SpyObj<SprintService>;
  let projectStateService: jasmine.SpyObj<ProjectStateService>;
  let router: jasmine.SpyObj<Router>;
  let toastService: jasmine.SpyObj<ToastService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  const mockSprints: Sprint[] = [
    {
      id: 1,
      name: 'Sprint 1',
      projectId: 1,
      startDate: new Date(),
      endDate: new Date(),
      status: SprintStatus.ACTIVE,
      tasks: [],
      issues: []
    }
  ];

  beforeEach(async () => {
    const sprintServiceSpy = jasmine.createSpyObj('SprintService', [
      'getSprintsByProject', 
      'deleteSprint', 
      'getSprint',
      'getSprintProgress',
      'getTotalTasksForSprint'
    ]);
    const projectStateServiceSpy = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    projectStateServiceSpy.getActiveProjectId.and.returnValue(of(1));
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['confirm']);

    await TestBed.configureTestingModule({
      imports: [SprintListComponent],
      providers: [
        provideHttpClientTesting(),
        { provide: SprintService, useValue: sprintServiceSpy },
        { provide: ProjectStateService, useValue: projectStateServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy }
      ]
    }).compileComponents();
    sprintService = TestBed.inject(SprintService) as jasmine.SpyObj<SprintService>;
    projectStateService = TestBed.inject(ProjectStateService) as jasmine.SpyObj<ProjectStateService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    projectStateService.getActiveProjectId.and.returnValue(of(1));
    sprintService.getSprintsByProject.and.returnValue(of(mockSprints));
    sprintService.getSprint.and.returnValue(of(mockSprints[0]));
    sprintService.getSprintProgress.and.returnValue(of(50));
    sprintService.getTotalTasksForSprint.and.returnValue(of(5));
    fixture = TestBed.createComponent(SprintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load sprints on init', () => {
    expect(projectStateService.getActiveProjectId).toHaveBeenCalled();
    expect(sprintService.getSprintsByProject).toHaveBeenCalledWith(1);
    expect(component.sprints).toEqual(mockSprints);
  });

  it('should navigate to edit sprint page', () => {
    component.onEdit(1);
    expect(router.navigate).toHaveBeenCalledWith(['/sprints/edit', 1]);
  });

  it('should navigate to create sprint page', () => {
    component.createSprint();
    expect(router.navigate).toHaveBeenCalledWith(['/sprints/create']);
  });

  it('should delete sprint after confirmation', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(true));
    sprintService.deleteSprint.and.returnValue(of(void 0));

    await component.onDelete(1);

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(sprintService.deleteSprint).toHaveBeenCalledWith(1);
    expect(toastService.success).toHaveBeenCalledWith('Sprint deleted successfully');
  });

  it('should not delete sprint if not confirmed', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(false));

    await component.onDelete(1);

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(sprintService.deleteSprint).not.toHaveBeenCalled();
  });

  it('should show error toast if delete fails', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(true));
    sprintService.deleteSprint.and.returnValue(of(void 0));
    
    await component.onDelete(1);
    
    expect(toastService.error).not.toHaveBeenCalled();
  });
});
