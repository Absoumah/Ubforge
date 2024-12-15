import { TestBed } from '@angular/core/testing';
import { HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ProjectStateService } from '../../project/services/project-state.service';
import { SprintService } from '../../sprint/services/sprint.service';
import { ReleaseService } from './release.service';
import { of } from 'rxjs';
import { Release, ReleaseStatus } from '../models/release';

describe('ReleaseService', () => {
  let service: ReleaseService;
  let httpMock: HttpTestingController;
  let mockProjectStateService: jasmine.SpyObj<ProjectStateService>;
  let mockSprintService: jasmine.SpyObj<SprintService>;

  mockSprintService = jasmine.createSpyObj('SprintService', ['getSprintProgress']);

  const mockRelease: Release = {
    id: 1,
    version: '1.0.0',
    name: 'Test Release',
    description: 'Test Description',
    releaseDate: '2023-01-01',
    status: ReleaseStatus.PLANNED,
    projectId: 1,
    sprintIds: [1, 2]
  };

  beforeEach(() => {
    mockProjectStateService = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    mockProjectStateService.getActiveProjectId.and.returnValue(of(null));
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ProjectStateService, useValue: mockProjectStateService },
        { provide: SprintService, useValue: mockSprintService }
      ]
    });
    service = TestBed.inject(ReleaseService);
    httpMock = TestBed.inject(HttpTestingController);

    // Handle the initial HTTP request made in the constructor
    const req = httpMock.expectOne('http://localhost:8081/release/getAll');
    expect(req.request.method).toBe('GET');
    req.flush([]);
    service = TestBed.inject(ReleaseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get releases by project id', () => {
    const projectId = 1;
    const mockReleases: Release[] = [mockRelease];

    service.getReleasesByProject(projectId);

    const req = httpMock.expectOne(`http://localhost:8081/release/project/${projectId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockReleases);

    service.getReleases().subscribe(releases => {
      expect(releases).toEqual(mockReleases);
    });
  });

  it('should get release by id', () => {
    const releaseId = 1;

    service.getReleaseById(releaseId).subscribe(release => {
      expect(release).toEqual(mockRelease);
    });

    const req = httpMock.expectOne(`http://localhost:8081/release/get/${releaseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRelease);
  });

  it('should add new release', () => {
    const newRelease: Omit<Release, 'id'> = {
      version: '1.0.0',
      name: 'New Release',
      description: 'New Description',
      releaseDate: '2023-01-01',
      status: ReleaseStatus.PLANNED,
      projectId: 1,
      sprintIds: []
    };

    service.addRelease(newRelease).subscribe(release => {
      expect(release).toEqual({...newRelease, id: 1});
    });

    const req = httpMock.expectOne(`http://localhost:8081/release/create`);
    expect(req.request.method).toBe('POST');
    req.flush({...newRelease, id: 1});
  });

  it('should calculate release progress', () => {
    const releaseId = 1;
    mockSprintService.getSprintProgress.and.returnValues(of(50), of(100));

    service.calculateReleaseProgress(releaseId).subscribe(progress => {
      expect(progress).toEqual({
        totalSprints: 2,
        completedSprints: 1,
        percentage: 75
      });
    });

    const req = httpMock.expectOne(`http://localhost:8081/release/get/${releaseId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRelease);
  });
});
