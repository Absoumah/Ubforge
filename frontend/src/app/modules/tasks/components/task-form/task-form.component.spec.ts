import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormComponent } from './task-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TaskService } from '../../services/task.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of } from 'rxjs';
import { TaskPriority } from '../../models/task-priority.enum';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let formBuilder: FormBuilder;
  let taskService: jasmine.SpyObj<TaskService>;
  let projectStateService: jasmine.SpyObj<ProjectStateService>;

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getAvailableUsers']);
    const projectStateServiceSpy = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    
    taskServiceSpy.getAvailableUsers.and.returnValue(of([]));
    projectStateServiceSpy.getActiveProjectId.and.returnValue(of(1));

    await TestBed.configureTestingModule({
      imports: [
        TaskFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ProjectStateService, useValue: projectStateServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    projectStateService = TestBed.inject(ProjectStateService) as jasmine.SpyObj<ProjectStateService>;

    component.taskGroup = formBuilder.group({
      name: [''],
      description: [''],
      priority: [''],
      assignedTo: [[]],
      estimatedHours: [0],
      completed: [false],
      projectId: [null]
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.showDescription).toBeFalse();
    expect(component.showAssignment).toBeFalse();
    expect(component.showEstimation).toBeFalse();
    expect(component.priorities).toEqual(Object.values(TaskPriority));
  });

  it('should toggle description section', () => {
    component.toggleSection('description');
    expect(component.showDescription).toBeTrue();
    
    component.toggleSection('description');
    expect(component.showDescription).toBeFalse();
  });

  it('should emit removeTask event when onRemove is called', () => {
    spyOn(component.removeTask, 'emit');
    component.onRemove();
    expect(component.removeTask.emit).toHaveBeenCalled();
  });

  it('should update projectId when component initializes', () => {
    expect(component.taskGroup.get('projectId')?.value).toBe(1);
  });

  it('should emit taskChange event when form values change', (done) => {
    spyOn(component.taskChange, 'emit');
    
    component.taskGroup.patchValue({ name: 'Test Task' });
    
    setTimeout(() => {
      expect(component.taskChange.emit).toHaveBeenCalledWith(component.taskGroup);
      done();
    }, 400);
  });

  it('should fetch available users on init', () => {
    expect(taskService.getAvailableUsers).toHaveBeenCalled();
  });

  it('should clean up subscriptions on destroy', () => {
    spyOn(component['destroy$'], 'next');
    spyOn(component['destroy$'], 'complete');
    
    component.ngOnDestroy();
    
    expect(component['destroy$'].next).toHaveBeenCalled();
    expect(component['destroy$'].complete).toHaveBeenCalled();
  });
});