// import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
// import { ActivatedRoute } from '@angular/router';
// import { TaskEditComponent } from './task-edit.component';
// import { TaskService } from '../../services/task.service';
// import { TaskStatus } from '../../models/task-status.enum';
// import { TaskPriority } from '../../models/task-priority.enum';
// import { of } from 'rxjs';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// describe('TaskEditComponent', () => {
//   let component: TaskEditComponent;
//   let fixture: ComponentFixture<TaskEditComponent>;

//   const mockAssignedUser = {
//     id: 1,
//     firstName: 'John',
//     lastName: 'Doe'
//   };

//   const mockTask = {
//     id: 1,
//     name: 'Test Task',
//     description: 'Test Description',
//     status: TaskStatus.TODO,
//     priority: TaskPriority.MEDIUM,
//     assignedTo: [mockAssignedUser],
//     estimatedHours: 8,
//     completed: false,
//     projectId: 1,
//     dueDate: new Date()
//   };

//   const createMockTaskForm = () => {
//     const form = new FormGroup({
//       name: new FormControl(mockTask.name),
//       description: new FormControl(mockTask.description),
//       status: new FormControl(mockTask.status),
//       priority: new FormControl(mockTask.priority),
//       assignedTo: new FormControl(mockTask.assignedTo.map(user => user.id)),
//       estimatedHours: new FormControl(mockTask.estimatedHours),
//       completed: new FormControl(mockTask.completed),
//       dueDate: new FormControl(mockTask.dueDate),
//       projectId: new FormControl(mockTask.projectId)
//     });
//     return form;
//   };

//   const mockTaskService = {
//     getTaskById: jasmine.createSpy('getTaskById').and.returnValue(of(mockTask)),
//     createTaskForm: jasmine.createSpy('createTaskForm').and.returnValue(createMockTaskForm()),
//     updateTask: jasmine.createSpy('updateTask').and.returnValue(of(mockTask)),
//     mapFormToTask: jasmine.createSpy('mapFormToTask').and.returnValue(mockTask),
//     getAvailableUsers: jasmine.createSpy('getAvailableUsers').and.returnValue(of([mockAssignedUser]))
//   };

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [
//         TaskEditComponent,
//         RouterTestingModule,
//         ReactiveFormsModule,
//         BrowserAnimationsModule
//       ],
//       providers: [
//         {
//           provide: ActivatedRoute,
//           useValue: {
//             snapshot: {
//               paramMap: {
//                 get: () => '1'
//               }
//             }
//           }
//         },
//         { provide: TaskService, useValue: mockTaskService }
//       ]
//     }).compileComponents();
//   });

//   beforeEach(fakeAsync(() => {
//     fixture = TestBed.createComponent(TaskEditComponent);
//     component = fixture.componentInstance;
//     tick(); // Wait for task loading
//     fixture.detectChanges();
//     tick(); // Wait for form initialization
//   }));

//   // it('should create', fakeAsync(() => {
//   //   expect(component).toBeTruthy();
//   // }));

//   it('should load task on init', fakeAsync(() => {
//     expect(mockTaskService.getTaskById).toHaveBeenCalledWith(1);
//     expect(mockTaskService.createTaskForm).toHaveBeenCalled();
//     expect(component.task).toEqual(mockTask);
//   }));

//   it('should initialize form with task data', fakeAsync(() => {
//     expect(component.taskForm).toBeDefined();
//     expect(component.taskForm?.get('name')).toBeDefined();
//     expect(component.taskForm?.get('name')?.value).toBe(mockTask.name);
//     expect(component.taskForm?.get('description')?.value).toBe(mockTask.description);
//     expect(component.taskForm?.get('status')?.value).toBe(mockTask.status);
//   }));
// });