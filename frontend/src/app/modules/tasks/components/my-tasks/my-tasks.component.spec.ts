import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyTasksComponent } from './my-tasks.component';
import { TaskService } from '../../services/task.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of } from 'rxjs';
import { Task, TaskPriority } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let fixture: ComponentFixture<MyTasksComponent>;
  let taskService: TaskService;
  let projectStateService: ProjectStateService;

  const mockTasks: Task[] = [
    {
      id: 1,
      name: 'Task 1',
      description: 'Description 1',
      priority: TaskPriority.MEDIUM,
      assignedTo: [{id: 1, firstName: 'User', lastName: '1'}],
      estimatedHours: 8,
      completed: false,
      status: TaskStatus.TODO,
      dueDate: new Date(),
      projectId: 1
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTasksComponent, HttpClientTestingModule],
      providers: [TaskService, ProjectStateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTasksComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService);
    projectStateService = TestBed.inject(ProjectStateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks on init when project is selected', () => {
    spyOn(taskService, 'getMyTasks').and.returnValue(of(mockTasks));
    spyOn(projectStateService, 'getActiveProjectId').and.returnValue(of(1));

    component.ngOnInit();

    expect(component.tasks).toEqual(mockTasks);
  });

  it('should return empty tasks array when no project is selected', () => {
    spyOn(taskService, 'getMyTasks').and.returnValue(of(mockTasks));
    spyOn(projectStateService, 'getActiveProjectId').and.returnValue(of(null));

    component.ngOnInit();

    expect(component.tasks).toEqual([]);
  });

  it('should call taskService.updateTaskStatus when onStatusChange is called', () => {
    const statusUpdate = { taskId: 1, status: TaskStatus.IN_PROGRESS };
    spyOn(taskService, 'updateTaskStatus').and.returnValue(of({} as Task));

    component.onStatusChange(statusUpdate);

    expect(taskService.updateTaskStatus).toHaveBeenCalledWith(
      statusUpdate.taskId,
      statusUpdate.status
    );
  });
});
