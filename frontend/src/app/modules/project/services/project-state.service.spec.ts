import { TestBed } from '@angular/core/testing';
import { ProjectStateService } from './project-state.service';
import { take } from 'rxjs';

describe('ProjectStateService', () => {
  let service: ProjectStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with null active project id', (done) => {
    service.getActiveProjectId().pipe(take(1)).subscribe(id => {
      expect(id).toBeNull();
      done();
    });
  });

  it('should set and get active project id', (done) => {
    const testId = 123;
    
    service.setActiveProject(testId);
    
    service.getActiveProjectId().pipe(take(1)).subscribe(id => {
      expect(id).toBe(testId);
      done();
    });
  });

  it('should allow setting active project id to null', (done) => {
    service.setActiveProject(123);
    service.setActiveProject(null);
    
    service.getActiveProjectId().pipe(take(1)).subscribe(id => {
      expect(id).toBeNull();
      done();
    });
  });
});
