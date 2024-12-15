import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MyTasksComponent } from './my-tasks.component';
import { TaskService } from '../../services/task.service';
import { ProjectStateService } from '../../../project/services/project-state.service';

describe('MyTasksComponent', () => {
  let component: MyTasksComponent;
  let fixture: ComponentFixture<MyTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyTasksComponent, HttpClientTestingModule],
      providers: [TaskService, ProjectStateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
