import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { TaskEditComponent } from './task-edit.component';
import { TaskService } from '../../services/task.service';
import { TaskStatus } from '../../models/task-status.enum';
import { TaskPriority } from '../../models/task-priority.enum';
import { FormGroup } from '@angular/forms';

describe('TaskEditComponent', () => {
    let component: TaskEditComponent;
    let fixture: ComponentFixture<TaskEditComponent>;
    let taskService: jasmine.SpyObj<TaskService>;
    let router: jasmine.SpyObj<Router>;
    
    const mockTask = {
        id: 1,
        name: 'Test Task',
        description: 'Test Description',
        priority: TaskPriority.MEDIUM,
        assignedTo: [{ id: 1, firstName: 'User', lastName: '1' }],
        estimatedHours: 8,
        completed: false,
        status: TaskStatus.TODO,
        dueDate: new Date(),
        projectId: 1
    };

    const mockFormGroup = new FormGroup({});

    beforeEach(async () => {
        const taskServiceSpy = jasmine.createSpyObj('TaskService', ['getTaskById', 'createTaskForm', 'updateTask', 'mapFormToTask']);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [TaskEditComponent],
            providers: [
                { provide: TaskService, useValue: taskServiceSpy },
                { provide: Router, useValue: routerSpy },
                { provide: ActivatedRoute, useValue: { 
                    snapshot: { paramMap: { get: () => '1' } }
                }}
            ]
        }).compileComponents();

        taskService = TestBed.inject(TaskService) as jasmine.SpyObj<TaskService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    beforeEach(() => {
        taskService.getTaskById.and.returnValue(of(mockTask));
        taskService.createTaskForm.and.returnValue(mockFormGroup);
        fixture = TestBed.createComponent(TaskEditComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should save task when form is valid', () => {
        const updatedTask = { ...mockTask, name: 'Updated Task' };
        taskService.mapFormToTask.and.returnValue(updatedTask);
        taskService.updateTask.and.returnValue(of(updatedTask));
        
        component.task = mockTask;
        component.taskForm = mockFormGroup;
        component.taskForm.setErrors(null);
        
        component.onSave();

        expect(taskService.updateTask).toHaveBeenCalledWith(mockTask.id, updatedTask);
        expect(router.navigate).toHaveBeenCalledWith(['/tasks', mockTask.id]);
    });

    it('should not save when form is invalid', () => {
        component.task = mockTask;
        component.taskForm = mockFormGroup;
        component.taskForm.setErrors({ invalid: true });
        
        component.onSave();

        expect(taskService.updateTask).not.toHaveBeenCalled();
    });

    it('should navigate to task details on cancel with task', () => {
        component.task = mockTask;
        component.onCancel();
        
        expect(router.navigate).toHaveBeenCalledWith(['/tasks', mockTask.id]);
    });

    it('should navigate to tasks list on cancel without task', () => {
        component.task = undefined;
        component.onCancel();
        
        expect(router.navigate).toHaveBeenCalledWith(['/tasks']);
    });
});