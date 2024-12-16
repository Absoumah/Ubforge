import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ReleaseFormComponent } from './release-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of, throwError } from 'rxjs';
import { Release, ReleaseStatus } from '../../models/release';

describe('ReleaseFormComponent', () => {
  let component: ReleaseFormComponent;
  let fixture: ComponentFixture<ReleaseFormComponent>;
  let router: Router;
  let mockActivatedRoute: any;

  const mockRelease: Release = {
    id: 1,
    version: '1.0.0',
    name: 'Test Release',
    description: 'Test Description',
    releaseDate: '2024-01-01',
    status: ReleaseStatus.PLANNED,
    projectId: 1,
    sprintIds: [1, 2]
  };

  const mockReleaseService = {
    getReleaseById: jasmine.createSpy('getReleaseById').and.returnValue(of(mockRelease)),
    addRelease: jasmine.createSpy('addRelease').and.returnValue(of(mockRelease)),
    updateRelease: jasmine.createSpy('updateRelease').and.returnValue(of(mockRelease))
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  const mockProjectStateService = {
    getActiveProjectId: jasmine.createSpy('getActiveProjectId').and.returnValue(of('1'))
  };

  beforeEach(async () => {
    mockActivatedRoute = {
      snapshot: {
        paramMap: {
          get: () => null
        }
      }
    };

    await TestBed.configureTestingModule({
      imports: [
        ReleaseFormComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        provideRouter([]),
        { provide: ReleaseService, useValue: mockReleaseService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ProjectStateService, useValue: mockProjectStateService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(ReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values in create mode', () => {
    expect(component.isEditMode).toBeFalse();
    expect(component.releaseForm.get('status')?.value).toBe(ReleaseStatus.PLANNED);
    expect(component.releaseForm.get('projectId')?.value).toBe('1');
  });

  it('should load release data in edit mode', () => {
    mockActivatedRoute.snapshot.paramMap.get = () => '1';
    component.ngOnInit();
    expect(component.isEditMode).toBeTrue();
    expect(mockReleaseService.getReleaseById).toHaveBeenCalledWith(1);
  });

  it('should handle release loading error in edit mode', () => {
    mockActivatedRoute.snapshot.paramMap.get = () => '1';
    mockReleaseService.getReleaseById.and.returnValue(throwError(() => new Error()));
    const navigateSpy = spyOn(router, 'navigate');
    
    component.ngOnInit();

    expect(mockToastService.error).toHaveBeenCalledWith('Failed to load release');
    expect(navigateSpy).toHaveBeenCalledWith(['/releases']);
  });

  it('should update sprint ids when onSprintSelectionChange is called', () => {
    const testSprintIds = [1, 2, 3];
    component.onSprintSelectionChange(testSprintIds);
    
    expect(component.selectedSprintIds).toEqual(testSprintIds);
    expect(component.releaseForm.get('sprintIds')?.value).toEqual(testSprintIds);
  });

  it('should show error when form is submitted with invalid data', () => {
    component.onSubmit();
    expect(mockToastService.error).toHaveBeenCalledWith('Please fill all required fields correctly');
  });

  it('should successfully create a new release', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.releaseForm.patchValue({
      version: '1.0.0',
      name: 'Test Release',
      description: 'Test Description',
      releaseDate: '2024-01-01',
      status: ReleaseStatus.PLANNED,
      projectId: 1
    });

    component.onSubmit();

    expect(mockReleaseService.addRelease).toHaveBeenCalled();
    expect(mockToastService.success).toHaveBeenCalledWith('Release created successfully');
    expect(navigateSpy).toHaveBeenCalledWith(['/releases']);
  });

  it('should successfully update an existing release', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.isEditMode = true;
    component.releaseId = 1;
    component.releaseForm.patchValue({
      version: '1.0.1',
      name: 'Updated Release',
      releaseDate: '2024-02-01',
      status: ReleaseStatus.IN_PROGRESS,
      projectId: 1
    });

    component.onSubmit();

    expect(mockReleaseService.updateRelease).toHaveBeenCalled();
    expect(mockToastService.success).toHaveBeenCalledWith('Release updated successfully');
    expect(navigateSpy).toHaveBeenCalledWith(['/releases']);
  });
});