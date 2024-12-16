import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../../services/project.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;
  let projectService: jasmine.SpyObj<ProjectService>;
  let dialogService: jasmine.SpyObj<DialogService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: jasmine.SpyObj<Router>;

  const mockProjects = [
    { id: 1, name: 'Project 1', url: 'url1', category: 'Web', description: 'desc1', assignedUsers: [], taskIds: [], issueIds: [] },
    { id: 2, name: 'Project 2', url: 'url2', category: 'Mobile', description: 'desc2', assignedUsers: [], taskIds: [], issueIds: [] }
  ];

  beforeEach(async () => {
    const projectServiceSpy = jasmine.createSpyObj('ProjectService', ['getProjects', 'deleteProject']);
    const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['confirm']);
    const toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error', 'info']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      imports: [ProjectListComponent],
      providers: [
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: ProjectService, useValue: projectServiceSpy },
        { provide: DialogService, useValue: dialogServiceSpy },
        { provide: ToastService, useValue: toastServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService) as jasmine.SpyObj<ProjectService>;
    dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load projects on init', () => {
    projectService.getProjects.and.returnValue(of(mockProjects));
    component.ngOnInit();
    expect(component.projects).toEqual(mockProjects);
  });

  it('should navigate to create project page', () => {
    component.createProject();
    expect(router.navigate).toHaveBeenCalledWith(['/projects/create']);
  });

  it('should navigate to edit project page', () => {
    component.editProject(1);
    expect(router.navigate).toHaveBeenCalledWith(['/projects/edit', 1]);
  });

  it('should handle project deletion when confirmed', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(true));
    projectService.deleteProject.and.returnValue(of(void 0));
    projectService.getProjects.and.returnValue(of(mockProjects));

    await component.deleteProject(1);

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(projectService.deleteProject).toHaveBeenCalledWith(1);
    expect(toastService.success).toHaveBeenCalledWith('Project deleted successfully');
    expect(component.projects).toEqual(mockProjects);
  });

  it('should handle project deletion cancellation', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(false));
    
    await component.deleteProject(1);

    expect(dialogService.confirm).toHaveBeenCalled();
    expect(projectService.deleteProject).not.toHaveBeenCalled();
    expect(toastService.info).toHaveBeenCalledWith('Project deletion cancelled');
  });

  it('should handle error when deleting project', async () => {
    dialogService.confirm.and.returnValue(Promise.resolve(true));
    projectService.deleteProject.and.returnValue(throwError(() => new Error('Delete failed')));

    await component.deleteProject(1);

    expect(toastService.error).toHaveBeenCalledWith('Failed to delete project');
  });
});
