import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectItemComponent } from './project-item.component';
import { Project } from '../../models/project.model';
import { User } from '../../../../core/models/user.model';
import { ProjectStateService } from '../../services/project-state.service';
import { BehaviorSubject } from 'rxjs';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;
  let projectStateService: jasmine.SpyObj<ProjectStateService>;
  let activeProjectId$: BehaviorSubject<number | null>;

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  };

  const mockProject: Project = {
    id: 1,
    name: 'Test Project',
    url: 'http://example.com',
    category: 'Development',
    description: 'Test Description',
    assignedUsers: [mockUser],
    taskIds: [1, 2, 3],
    issueIds: [1, 2, 3],
  };

  beforeEach(async () => {
    activeProjectId$ = new BehaviorSubject<number | null>(null);
    projectStateService = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId', 'setActiveProject']);
    projectStateService.getActiveProjectId.and.returnValue(activeProjectId$);

    await TestBed.configureTestingModule({
      imports: [ProjectItemComponent],
      providers: [
        { provide: ProjectStateService, useValue: projectStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;
    component.project = mockProject;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get user initials correctly', () => {
    const initials = component.getUserInitials(mockUser);
    expect(initials).toBe('JD');
  });

  it('should toggle description', () => {
    expect(component.isDescriptionExpanded).toBeFalse();
    component.toggleDescription();
    expect(component.isDescriptionExpanded).toBeTrue();
    component.toggleDescription();
    expect(component.isDescriptionExpanded).toBeFalse();
  });

  it('should handle active state changes', () => {
    activeProjectId$.next(1);
    expect(component.isActive).toBeTrue();
    
    activeProjectId$.next(2);
    expect(component.isActive).toBeFalse();
  });

  it('should toggle active state', () => {
    component.toggleActive();
    expect(projectStateService.setActiveProject).toHaveBeenCalledWith(1);

    component.isActive = true;
    component.toggleActive();
    expect(projectStateService.setActiveProject).toHaveBeenCalledWith(null);
  });

  it('should emit edit event', () => {
    spyOn(component.edit, 'emit');
    component.edit.emit(mockProject.id);
    expect(component.edit.emit).toHaveBeenCalledWith(mockProject.id);
  });

  it('should emit delete event', () => {
    spyOn(component.delete, 'emit');
    component.delete.emit(mockProject.id);
    expect(component.delete.emit).toHaveBeenCalledWith(mockProject.id);
  });

  it('should unsubscribe on destroy', () => {
    const subscription = spyOn(component['subscription'] as any, 'unsubscribe');
    component.ngOnDestroy();
    expect(subscription).toHaveBeenCalled();
  });
});