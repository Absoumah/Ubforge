import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KanbanBoardComponent } from './kanban-board.component';
import { TaskService } from '../../services/task.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { CommonModule } from '@angular/common';
import { DragDropModule, CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Task, TaskPriority } from '../../models/task.interface';
import { TaskStatus } from '../../models/task-status.enum';
import { BehaviorSubject, of } from 'rxjs';

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let taskService: jasmine.SpyObj<TaskService>;
  let projectStateService: jasmine.SpyObj<ProjectStateService>;

  const mockTasks: Task[] = [
    { id: 1, status: TaskStatus.TODO, name: 'Task 1', description: '', priority: TaskPriority.LOW, assignedTo: [], estimatedHours: 0, completed: false, dueDate: null, projectId: 1 },
    { id: 2, status: TaskStatus.IN_PROGRESS, name: 'Task 2', description: '', priority: TaskPriority.MEDIUM, assignedTo: [], estimatedHours: 0, completed: false, dueDate: null, projectId: 1 },
    { id: 3, status: TaskStatus.COMPLETED, name: 'Task 3', description: '', priority: TaskPriority.HIGH, assignedTo: [], estimatedHours: 0, completed: true, dueDate: null, projectId: 1 }
  ];

  beforeEach(async () => {
    const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTasksByProject', 'updateTaskStatus']);
    const projectStateServiceSpy = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    
    taskServiceSpy.getTasksByProject.and.returnValue(of(mockTasks));
    projectStateServiceSpy.getActiveProjectId.and.returnValue(new BehaviorSubject<number>(1));

    await TestBed.configureTestingModule({
      imports: [KanbanBoardComponent, HttpClientTestingModule],
      providers: [
        { provide: TaskService, useValue: taskServiceSpy },
        { provide: ProjectStateService, useValue: projectStateServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    projectStateService = TestBed.inject(ProjectStateService) as jasmine.SpyObj<ProjectStateService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load tasks and sort them by status on init', () => {
    expect(component.todoTasks.length).toBe(1);
    expect(component.inProgressTasks.length).toBe(1);
    expect(component.completedTasks.length).toBe(1);
  });

  it('should update task status when dropping task', () => {
    taskService.updateTaskStatus.and.returnValue(of({} as Task));
    
    const mockDragEvent = {
      previousContainer: { data: component.todoTasks },
      container: { data: component.inProgressTasks },
      previousIndex: 0,
      currentIndex: 0
    } as CdkDragDrop<Task[]>;

    component.onDrop(mockDragEvent, TaskStatus.IN_PROGRESS);

    expect(taskService.updateTaskStatus).toHaveBeenCalledWith(
      mockTasks[0].id,
      TaskStatus.IN_PROGRESS
    );
  });

  it('should handle null project ID', () => {
    projectStateService.getActiveProjectId.and.returnValue(new BehaviorSubject<number | null>(null));
    component.ngOnInit();
    
    expect(component.todoTasks).toEqual([]);
    expect(component.inProgressTasks).toEqual([]);
    expect(component.completedTasks).toEqual([]);
  });
});

describe('KanbanBoardComponent', () => {
  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KanbanBoardComponent, HttpClientTestingModule],
      providers: [TaskService, ProjectStateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
