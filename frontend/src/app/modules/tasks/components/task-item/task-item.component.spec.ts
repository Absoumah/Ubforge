import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TaskEditComponent } from '../task-edit/task-edit.component';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task-status.enum';
import { TaskPriority } from '../../models/task-priority.enum';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TaskEditComponent', () => {
  let component: TaskEditComponent;
  let fixture: ComponentFixture<TaskEditComponent>;

  const mockAssignedUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe'
  };

  const mockTask = {
    id: 1,
    name: 'Test Task',
    description: 'Test Description',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    assignedTo: [mockAssignedUser],
    estimatedHours: 8,
    completed: false,
    projectId: 1,
    dueDate: new Date() // Add missing dueDate property
  };

  const mockTaskService = {
    getTaskById: jasmine.createSpy('getTaskById').and.returnValue(of(mockTask)),
    createTaskForm: jasmine.createSpy('createTaskForm').and.returnValue(new FormGroup({})),
    updateTask: jasmine.createSpy('updateTask').and.returnValue(of(mockTask)),
    mapFormToTask: jasmine.createSpy('mapFormToTask').and.returnValue(mockTask),
    getAvailableUsers: jasmine.createSpy('getAvailableUsers').and.returnValue(of([mockAssignedUser]))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskEditComponent,
        RouterTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        },
        { provide: TaskService, useValue: mockTaskService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});