import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectSwitcherComponent } from './project-switcher.component';
import { ProjectService } from '../../services/project.service';
import { ProjectStateService } from '../../services/project-state.service';
import { of } from 'rxjs';
import { Project } from '../../models/project.model';

describe('ProjectSwitcherComponent', () => {
  let component: ProjectSwitcherComponent;
  let fixture: ComponentFixture<ProjectSwitcherComponent>;
  let projectService: ProjectService;
  let projectStateService: ProjectStateService;
  const mockProjects: Project[] = [
    { 
      id: 1, 
      name: 'Project 1',
      url: 'http://project1.com',
      category: 'Development',
      description: 'Test Project 1',
      assignedUsers: [],
      taskIds: [],
      issueIds: []
    },
    { 
      id: 2, 
      name: 'Project 2',
      url: 'http://project2.com',
      category: 'Development',
      description: 'Test Project 2',
      assignedUsers: [],
      taskIds: [],
      issueIds: []
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSwitcherComponent, HttpClientModule],
      providers: [ProjectService, ProjectStateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSwitcherComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    projectStateService = TestBed.inject(ProjectStateService);
    
    spyOn(projectService, 'getProjects').and.returnValue(of(mockProjects));
    spyOn(projectStateService, 'getActiveProjectId').and.returnValue(of(null));
    spyOn(projectStateService, 'setActiveProject');
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    expect(component.projects).toEqual(mockProjects);
    expect(projectService.getProjects).toHaveBeenCalled();
  });

  it('should update activeProjectId when project state changes', () => {
    projectStateService.getActiveProjectId = jasmine.createSpy().and.returnValue(of(1));
    component.ngOnInit();
    expect(component.activeProjectId).toBe(1);
  });

  it('should toggle project active state when setActiveProject is called', () => {
    component.activeProjectId = 1;
    component.setActiveProject(mockProjects[0]);
    expect(projectStateService.setActiveProject).toHaveBeenCalledWith(null);

    component.activeProjectId = null;
    component.setActiveProject(mockProjects[0]);
    expect(projectStateService.setActiveProject).toHaveBeenCalledWith(1);
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['subscriptions'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscriptions'].unsubscribe).toHaveBeenCalled();
  });
});
