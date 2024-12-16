import { ComponentFixture, TestBed } from "@angular/core/testing";
import { ProjectFormComponent } from "./project-form.component";
import { of } from "rxjs";
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { ActivatedRoute, convertToParamMap, provideRouter } from "@angular/router";
import { ProjectService } from "../../services/project.service";
import { ToastService } from "../../../../shared/services/toast.service";

describe('ProjectFormComponent', () => {
  let component: ProjectFormComponent;
  let fixture: ComponentFixture<ProjectFormComponent>;
  const mockProjectService = {
    getCategories: jasmine.createSpy('getCategories').and.returnValue(['Development', 'Design']),
    getProjectById: jasmine.createSpy('getProjectById').and.returnValue(of({
      id: 1,
      name: 'Test Project', 
      url: 'http://example.com',
      category: 'Development',
      description: 'Test Description',
      assignedUsers: []
    })),
    addProject: jasmine.createSpy('addProject').and.returnValue(of(undefined)),
    updateProject: jasmine.createSpy('updateProject').and.returnValue(of(undefined))
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectFormComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        { provide: ProjectService, useValue: mockProjectService },
        { provide: ToastService, useValue: mockToastService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(mockProjectService.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(['Development', 'Design']);
  });

  it('should load project data in edit mode', () => {
    expect(mockProjectService.getProjectById).toHaveBeenCalledWith(1);
    expect(component.projectForm.get('name')?.value).toBe('Test Project');
    expect(component.projectForm.get('url')?.value).toBe('http://example.com');
    expect(component.projectForm.get('category')?.value).toBe('Development');
    expect(component.projectForm.get('description')?.value).toBe('Test Description');
  });

  it('should validate url format', () => {
    const urlControl = component.projectForm.controls['url'];
    
    urlControl.setValue('invalid-url');
    expect(urlControl.errors?.['pattern']).toBeTruthy();
    
    urlControl.setValue('http://valid-url.com');
    expect(urlControl.errors).toBeNull();
  });

  it('should validate name length', () => {
    const nameControl = component.projectForm.controls['name'];
    
    nameControl.setValue('a'.repeat(21));
    expect(nameControl.errors?.['maxlength']).toBeTruthy();
    
    nameControl.setValue('Valid Name');
    expect(nameControl.errors).toBeNull();
  });

  it('should submit form with valid data for new project', () => {
    const projectData = {
      name: 'New Project',
      url: 'http://newproject.com',
      category: 'Development',
      description: 'New Project Description',
      assignedUsers: []
    };
    
    component.projectForm.patchValue(projectData);
    component.isEditMode = false;
    component.onSubmit();

    expect(mockProjectService.addProject).toHaveBeenCalledWith(jasmine.objectContaining(projectData));
    expect(mockToastService.success).toHaveBeenCalledWith('Project created successfully');
  });

  it('should submit form with valid data for project update', () => {
    const projectData = {
      name: 'Updated Project',
      url: 'http://updatedproject.com',
      category: 'Development', 
      description: 'Updated Description',
      assignedUsers: []
    };

    component.projectForm.patchValue(projectData);
    component.isEditMode = true;
    component.projectId = 1;
    component.onSubmit();

    expect(mockProjectService.updateProject).toHaveBeenCalledWith(jasmine.objectContaining({
      ...projectData,
      id: 1
    }));
    expect(mockToastService.success).toHaveBeenCalledWith('Project updated successfully');
  });
});