import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskItemComponent } from './task-item.component';
import { TaskStatus } from '../../models/task-status.enum';
import { TaskPriority } from '../../models/task-priority.enum';
import { Task } from '../../models/task.interface';
import { AssignedUser } from '../../../issue/models/assigned-user.interface';

describe('TaskItemComponent', () => {
  let component: TaskItemComponent;
  let fixture: ComponentFixture<TaskItemComponent>;

  const mockAssignedUser: AssignedUser = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe'
  };

  const mockTask: Task = {
    id: 1,
    name: 'Test Task',
    description: 'Test Description',
    priority: TaskPriority.MEDIUM,
    assignedTo: [mockAssignedUser],
    estimatedHours: 8,
    completed: false,
    status: TaskStatus.TODO,
    dueDate: new Date()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskItemComponent);
    component = fixture.componentInstance;
    component.task = mockTask;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});