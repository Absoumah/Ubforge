import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { TaskDetailComponent } from './task-detail.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';
import { TaskStatus } from '../../models/task-status.enum';
import { TaskPriority } from '../../models/task-priority.enum';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockTaskService: jasmine.SpyObj<TaskService>;

  const mockTask = {
    id: 1,
    name: 'Test Task',
    description: 'Test Description', 
    status: TaskStatus.TODO,
    priority: TaskPriority.HIGH,
    assignedTo: [],
    estimatedHours: 8,
    completed: false,
    projectId: 1,
    dueDate: null
  };

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockTaskService = jasmine.createSpyObj('TaskService', ['getTaskById', 'updateTaskStatus']);
    mockTaskService.getTaskById.and.returnValue(of(mockTask));
    mockTaskService.updateTaskStatus.and.returnValue(of(mockTask));

    await TestBed.configureTestingModule({
      imports: [TaskDetailComponent],
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
        { provide: Router, useValue: mockRouter },
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load task details on init', () => {
    expect(mockTaskService.getTaskById).toHaveBeenCalledWith(1);
    expect(component.task).toEqual(mockTask);
  });


  it('should mark task as done and navigate to my-tasks', () => {
    component.task = mockTask;
    component.markAsDone();
    expect(mockTaskService.updateTaskStatus).toHaveBeenCalledWith(1, TaskStatus.COMPLETED);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks/my-tasks']); // Updated expectation
  });

  it('should navigate to edit task page when onEdit is called', () => {
    component.task = mockTask;
    component.onEdit();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/tasks', 1, 'edit']);
  });

  it('should not call updateTaskStatus if task is undefined', () => {
    component.task = undefined;
    component.markAsDone();
    expect(mockTaskService.updateTaskStatus).not.toHaveBeenCalled();
  });

  it('should not navigate to edit page if task is undefined', () => {
    component.task = undefined;
    component.onEdit();
    expect(mockRouter.navigate).not.toHaveBeenCalled();
  });
});