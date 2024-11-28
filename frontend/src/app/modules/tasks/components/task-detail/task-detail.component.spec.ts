import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { TaskDetailComponent } from './task-detail.component';
import { TaskService } from '../../services/task.service';
import { of } from 'rxjs';

describe('TaskDetailComponent', () => {
  let component: TaskDetailComponent;
  let fixture: ComponentFixture<TaskDetailComponent>;

  const mockTask = {
    id: 1,
    name: 'Test Task',
    description: 'Test Description',
    status: 'OPEN',
    priority: 'HIGH',
    assignedTo: [],
    estimatedHours: 8,
    completed: false
  };

  const mockTaskService = {
    getTaskById: jasmine.createSpy('getTaskById').and.returnValue(of(mockTask)),
    updateTaskStatus: jasmine.createSpy('updateTaskStatus').and.returnValue(of({}))
  };

  beforeEach(async () => {
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
        { provide: TaskService, useValue: mockTaskService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});