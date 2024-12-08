import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ReleaseFormComponent } from './release-form.component';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of } from 'rxjs';

describe('ReleaseFormComponent', () => {
  let component: ReleaseFormComponent;
  let fixture: ComponentFixture<ReleaseFormComponent>;

  const mockReleaseService = {
    getReleaseById: jasmine.createSpy('getReleaseById').and.returnValue(null),
    addRelease: jasmine.createSpy('addRelease'),
    updateRelease: jasmine.createSpy('updateRelease')
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  const mockProjectStateService = {
    getActiveProjectId: jasmine.createSpy('getActiveProjectId').and.returnValue(of('1'))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReleaseFormComponent,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: ReleaseService, useValue: mockReleaseService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with default values', () => {
    expect(component.releaseForm).toBeDefined();
    expect(component.releaseForm.get('version')).toBeTruthy();
    expect(component.releaseForm.get('name')).toBeTruthy();
    expect(component.releaseForm.get('description')).toBeTruthy();
    expect(component.releaseForm.get('releaseDate')).toBeTruthy();
    expect(component.releaseForm.get('status')).toBeTruthy();
  });

  it('should set project ID on init', () => {
    expect(mockProjectStateService.getActiveProjectId).toHaveBeenCalled();
    expect(component.releaseForm.get('projectId')?.value).toBe('1');
  });
});