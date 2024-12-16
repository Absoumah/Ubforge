import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SprintFormComponent } from './sprint-form.component';
import { SprintService } from '../../services/sprint.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { SprintStatus } from '../../models/sprint.interface';

describe('SprintFormComponent', () => {
  let component: SprintFormComponent; 
  let fixture: ComponentFixture<SprintFormComponent>;

  const mockSprint = {
    id: 1,
    name: 'Test Sprint',
    description: 'Test Description',
    startDate: '2023-01-01',
    endDate: '2023-01-31',
    status: SprintStatus.PLANNED,
    projectId: 1,
    tasks: [],
    issues: [1, 2]
  };

  const mockSprintService = {
    getSprint: jasmine.createSpy('getSprint').and.returnValue(of(mockSprint)),
    createSprint: jasmine.createSpy('createSprint').and.returnValue(of(mockSprint)),
    updateSprint: jasmine.createSpy('updateSprint').and.returnValue(of(mockSprint))
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  const mockProjectStateService = {
    getActiveProjectId: jasmine.createSpy('getActiveProjectId').and.returnValue(of('1'))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SprintFormComponent, 
        ReactiveFormsModule
      ],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        { provide: SprintService, useValue: mockSprintService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark form as invalid when required fields are empty', () => {
    component.sprintForm.controls['name'].setValue('');
    expect(component.sprintForm.valid).toBeFalsy();
  });

  it('should mark form as valid when all required fields are filled', () => {
    component.sprintForm.patchValue({
      name: 'Test Sprint',
      description: 'Test Description',
      startDate: '2023-01-01',
      endDate: '2023-01-31',
      status: SprintStatus.PLANNED,
      projectId: '1'
    });
    expect(component.sprintForm.valid).toBeTruthy();
  });

  it('should handle issue selection changes', () => {
    const testIssueIds = [1, 2, 3];
    component.onIssueSelectionChange(testIssueIds);
    expect(component.selectedIssueIds).toEqual(testIssueIds);
  });

  it('should create new sprint when form is submitted in create mode', () => {
    component.isEditMode = false;
    component.sprintForm.patchValue({
      name: 'Test Sprint',
      description: 'Test Description',
      startDate: '2023-01-01',
      endDate: '2023-01-31',
      status: SprintStatus.PLANNED,
      projectId: '1'
    });

    component.onSubmit();

    expect(mockSprintService.createSprint).toHaveBeenCalled();
    expect(mockToastService.success).toHaveBeenCalledWith('Sprint created successfully');
  });

  it('should update sprint when form is submitted in edit mode', () => {
    component.isEditMode = true;
    component.sprintId = '1';
    component.sprintForm.patchValue({
      name: 'Updated Sprint',
      description: 'Updated Description',
      startDate: '2023-01-01',
      endDate: '2023-01-31',
      status: SprintStatus.PLANNED,
      projectId: '1'
    });

    component.onSubmit();

    expect(mockSprintService.updateSprint).toHaveBeenCalled();
    expect(mockToastService.success).toHaveBeenCalledWith('Sprint updated successfully');
  });

  it('should show error toast when project is not selected', () => {
    mockProjectStateService.getActiveProjectId.and.returnValue(of(null));
    component.ngOnInit();
    expect(mockToastService.error).toHaveBeenCalledWith('Please select a project first');
  });
});