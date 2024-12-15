import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { KanbanBoardComponent } from './kanban-board.component';
import { TaskService } from '../../services/task.service';
import { ProjectStateService } from '../../../project/services/project-state.service';

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
