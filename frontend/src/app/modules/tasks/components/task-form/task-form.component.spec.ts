import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TaskFormComponent } from './task-form.component';

describe('TaskFormComponent', () => {
  let component: TaskFormComponent;
  let fixture: ComponentFixture<TaskFormComponent>;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TaskFormComponent,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [FormBuilder]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskFormComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);

    // Initialize the taskGroup FormGroup
    component.taskGroup = formBuilder.group({
      name: [''],
      description: [''],
      priority: [''],
      assignedTo: [[]],
      estimatedHours: [0],
      completed: [false]
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});