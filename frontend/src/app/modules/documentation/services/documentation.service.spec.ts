import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DocumentationService } from './documentation.service';
import { ProjectStateService } from '../../project/services/project-state.service';
import { of } from 'rxjs';

describe('DocumentationService', () => {
  let service: DocumentationService;
  let mockProjectStateService: jasmine.SpyObj<ProjectStateService>;

  beforeEach(() => {
    mockProjectStateService = jasmine.createSpyObj('ProjectStateService', ['getActiveProjectId']);
    mockProjectStateService.getActiveProjectId.and.returnValue(of(null));

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    });
    service = TestBed.inject(DocumentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
