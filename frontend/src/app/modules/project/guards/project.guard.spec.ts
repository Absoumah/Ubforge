import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectGuard } from './project.guard';
import { ProjectStateService } from '../services/project-state.service';
import { ToastService } from '../../../shared/services/toast.service';

describe('ProjectGuard', () => {
  let guard: ProjectGuard;
  let projectStateService: jasmine.SpyObj<ProjectStateService>;
  let toastService: jasmine.SpyObj<ToastService>;

  beforeEach(() => {
    const projectStateSpy = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    const toastSpy = jasmine.createSpyObj('ToastService', ['error']);

    TestBed.configureTestingModule({
      imports: [],
      providers: [
        ProjectGuard,
        { provide: ProjectStateService, useValue: projectStateSpy },
        { provide: ToastService, useValue: toastSpy }
      ]
    });

    guard = TestBed.inject(ProjectGuard);
    projectStateService = TestBed.inject(ProjectStateService) as jasmine.SpyObj<ProjectStateService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});


