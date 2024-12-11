import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SprintItemComponent } from '../sprint-item/sprint-item.component';
import { SprintStatus } from '../../models/sprint.interface';

describe('SprintItemComponent', () => {
  let component: SprintItemComponent;
  let fixture: ComponentFixture<SprintItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SprintItemComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintItemComponent);
    component = fixture.componentInstance;


    // Provide mock sprint data
    component.sprint = {
      id: '1',
      name: 'Test Sprint',
      description: 'Test Description',
      startDate: new Date(),
      endDate: new Date(),
      status: SprintStatus.PLANNED,
      projectId: '1',
      tasks: [],
      issues: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});