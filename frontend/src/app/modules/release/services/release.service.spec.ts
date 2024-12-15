import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProjectStateService } from '../../project/services/project-state.service';
import { SprintService } from '../../sprint/services/sprint.service';
import { ReleaseService } from './release.service';
import { of } from 'rxjs';

describe('ReleaseService', () => {
  let service: ReleaseService;
  let mockProjectStateService: jasmine.SpyObj<ProjectStateService>;
  let mockSprintService: jasmine.SpyObj<SprintService>;

  beforeEach(() => {
    mockProjectStateService = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    mockProjectStateService.getActiveProjectId.and.returnValue(of(null));
    mockSprintService = jasmine.createSpyObj('SprintService', ['getSprintProgress']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProjectStateService, useValue: mockProjectStateService },
        { provide: SprintService, useValue: mockSprintService }
      ]
    });
    service = TestBed.inject(ReleaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
