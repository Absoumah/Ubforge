import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { ProjectGuard } from './project.guard';
import { ProjectStateService } from '../services/project-state.service';
import { ToastService } from '../../../shared/services/toast.service';
import { BehaviorSubject, of } from 'rxjs';

describe('ProjectGuard', () => {
  let guard: ProjectGuard;
  let projectStateService: jasmine.SpyObj<ProjectStateService>;
  let toastService: jasmine.SpyObj<ToastService>;
  let router: Router;

  beforeEach(() => {
    const projectStateSpy = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    const toastSpy = jasmine.createSpyObj('ToastService', ['error']);

    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ProjectGuard,
        { provide: ProjectStateService, useValue: projectStateSpy },
        { provide: ToastService, useValue: toastSpy }
      ]
    });

    guard = TestBed.inject(ProjectGuard);
    projectStateService = TestBed.inject(ProjectStateService) as jasmine.SpyObj<ProjectStateService>;
    toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when project ID exists', (done) => {
    projectStateService.getActiveProjectId.and.returnValue(of(1));
    
    guard.canActivate().subscribe(result => {
      expect(result).toBeTruthy();
      expect(toastService.error).not.toHaveBeenCalled();
      done();
    });
  });

  it('should prevent activation when no project ID exists', (done) => {
    projectStateService.getActiveProjectId.and.returnValue(of(null));
    spyOn(router, 'navigate');
    
    guard.canActivate().subscribe(result => {
      expect(result).toBeFalsy();
      expect(toastService.error).toHaveBeenCalledWith('Please select a project first');
      expect(router.navigate).toHaveBeenCalledWith(['/projects']);
      done();
    });
  });

  it('should take only first emission from projectState', (done) => {
    const subject = new BehaviorSubject<number | null>(1);
    projectStateService.getActiveProjectId.and.returnValue(subject.asObservable());
    
    guard.canActivate().subscribe(result => {
      expect(result).toBeTruthy();
      subject.next(null); // This should not trigger another emission
      done();
    });
  });
});
