import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SprintItemComponent } from './sprint-item.component';
import { SprintStatus } from '../../models/sprint.interface';
import { Router } from '@angular/router';

describe('SprintItemComponent', () => {
  let component: SprintItemComponent;
  let fixture: ComponentFixture<SprintItemComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SprintItemComponent,
        RouterTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);

    // Mock the progress getter
    Object.defineProperty(component, 'progress', {
      get: () => 50
    });

    // Provide mock sprint data
    component.sprint = {
      id: 1,
      name: 'Test Sprint',
      description: 'Test Description',
      startDate: new Date(),
      endDate: new Date(),
      status: SprintStatus.PLANNED,
      projectId: 1,
      tasks: [],
      issues: []
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have correct status class', () => {
    expect(component.statusClass).toBe('planned');
  });

  it('should emit edit event', () => {
    const spy = spyOn(component.edit, 'emit');
    const event = new Event('click');
    component.editSprint(event);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should emit delete event', () => {
    const spy = spyOn(component.delete, 'emit');
    const event = new Event('click');
    component.deleteSprint(event);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should navigate to sprint detail', () => {
    const spy = spyOn(router, 'navigate');
    component.viewSprint();
    expect(spy).toHaveBeenCalledWith(['/sprints', 1]);
  });
});