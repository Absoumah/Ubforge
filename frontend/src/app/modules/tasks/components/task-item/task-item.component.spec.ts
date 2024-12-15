import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { TaskItemComponent } from './task-item.component';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task-status.enum';
import { TaskPriority } from '../../models/task-priority.enum';
import { StatusDropdownComponent } from '../../../../shared/components/status-dropdown/status-dropdown.component';
import { UserAvatarComponent } from '../../../../shared/components/user-avatar/user-avatar.component';

describe('TaskItemComponent', () => {
    let component: TaskItemComponent;
    let fixture: ComponentFixture<TaskItemComponent>;
    let router: Router;
    let taskService: jasmine.SpyObj<TaskService>;

    const mockTask = {
        id: 1,
        name: 'Test Task',
        description: 'Test Description',
        priority: TaskPriority.HIGH,
        assignedTo: [{ id: 1, firstName: 'John', lastName: 'Doe' }],
        estimatedHours: 8,
        completed: false,
        status: TaskStatus.TODO,
        dueDate: new Date(),
        projectId: 1
    };

    beforeEach(async () => {
        const taskServiceSpy = jasmine.createSpyObj('TaskService', ['updateTaskStatus']);
        taskServiceSpy.updateTaskStatus.and.returnValue(of({ ...mockTask, status: TaskStatus.IN_PROGRESS }));

        await TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                TaskItemComponent,
                StatusDropdownComponent,
                UserAvatarComponent
            ],
            providers: [
                { provide: TaskService, useValue: taskServiceSpy }
            ]
        }).compileComponents();

        router = TestBed.inject(Router);
        taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TaskItemComponent);
        component = fixture.componentInstance;
        component.task = mockTask;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should return correct priority class', () => {
        expect(component.getPriorityClass()).toBe('priority-high');
    });

    it('should navigate to task details on click', () => {
        const navigateSpy = spyOn(router, 'navigate');
        component.onTaskClick();
        expect(navigateSpy).toHaveBeenCalledWith(['/tasks', mockTask.id]);
    });

    it('should emit status change when status is updated', () => {
        const statusChangeSpy = spyOn(component.statusChange, 'emit');
        const newStatus = TaskStatus.IN_PROGRESS;

        component.onStatusChange(newStatus);

        expect(taskService.updateTaskStatus).toHaveBeenCalledWith(mockTask.id, newStatus);
        expect(statusChangeSpy).toHaveBeenCalledWith({ taskId: mockTask.id, status: newStatus });
    });

    it('should not emit status change when new status is same as current', () => {
        const statusChangeSpy = spyOn(component.statusChange, 'emit');
        
        component.onStatusChange(mockTask.status);

        expect(taskService.updateTaskStatus).not.toHaveBeenCalled();
        expect(statusChangeSpy).not.toHaveBeenCalled();
    });
});