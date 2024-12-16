import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SprintSelectorComponent } from './sprint-selector.component';
import { SprintService } from '../../services/sprint.service';
import { of } from 'rxjs';
import { SprintStatus } from '../../models/sprint.interface';

describe('SprintSelectorComponent', () => {
  let component: SprintSelectorComponent;
  let fixture: ComponentFixture<SprintSelectorComponent>;
  let sprintService: SprintService;

  const mockSprints = [
    { 
      id: 1, 
      projectId: 1, 
      name: 'Sprint 1',
      startDate: new Date(),
      endDate: new Date(),
      status: SprintStatus.PLANNED,
      tasks: [],
      issues: []
    },
    { 
      id: 2, 
      projectId: 1, 
      name: 'Sprint 2',
      startDate: new Date(),
      endDate: new Date(),
      status: SprintStatus.ACTIVE,
      tasks: [],
      issues: []
    },
    { 
      id: 3, 
      projectId: 1, 
      name: 'Sprint 3',
      startDate: new Date(),
      endDate: new Date(),
      status: SprintStatus.COMPLETED,
      tasks: [],
      issues: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintSelectorComponent, HttpClientTestingModule],
      providers: [SprintService]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintSelectorComponent);
    component = fixture.componentInstance;
    sprintService = TestBed.inject(SprintService);
    component.projectId = 1;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load project sprints on init', () => {
    spyOn(sprintService, 'getSprintsByProject').and.returnValue(of(mockSprints));
    component.ngOnInit();
    component.projectSprints$.subscribe(sprints => {
      expect(sprints).toEqual(mockSprints);
      expect(sprintService.getSprintsByProject).toHaveBeenCalledWith(1);
    });
  });

  it('should correctly check if sprint is selected', () => {
    component.selectedSprintIds = [1, 2];
    expect(component.isSelected(1)).toBeTrue();
    expect(component.isSelected(3)).toBeFalse();
  });

  it('should emit new selection when toggling sprint selection', () => {
    spyOn(component.sprintSelectionChange, 'emit');
    component.selectedSprintIds = [1, 2];

    // Test adding a sprint
    component.toggleSprint(3);
    expect(component.sprintSelectionChange.emit).toHaveBeenCalledWith([1, 2, 3]);

    // Test removing a sprint
    component.toggleSprint(1);
    expect(component.sprintSelectionChange.emit).toHaveBeenCalledWith([2]);
  });

  it('should handle empty initial selection', () => {
    component.selectedSprintIds = [];
    spyOn(component.sprintSelectionChange, 'emit');
    
    component.toggleSprint(1);
    expect(component.sprintSelectionChange.emit).toHaveBeenCalledWith([1]);
  });
});
