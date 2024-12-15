import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { ProjectFormComponent } from './project-form.component';
import { ProjectService } from '../../services/project.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

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
    addProject: jasmine.createSpy('addProject'),
    updateProject: jasmine.createSpy('updateProject')
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
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});