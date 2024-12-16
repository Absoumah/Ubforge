import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
    let service: ProjectService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ProjectService]
        });
        service = TestBed.inject(ProjectService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get all projects', () => {
        const mockProjects: Project[] = [
            { id: 1, name: 'Test Project 1', description: 'Test Description 1', category: 'Web', url: '', assignedUsers: [], taskIds: [], issueIds: [] },
            { id: 2, name: 'Test Project 2', description: 'Test Description 2', category: 'Mobile', url: '', assignedUsers: [], taskIds: [], issueIds: [] }
        ];

        service.getProjects().subscribe(projects => {
            expect(projects).toEqual(mockProjects);
        });

        const req = httpMock.expectOne('http://localhost:8081/project/getAll');
        expect(req.request.method).toBe('GET');
        req.flush(mockProjects);
    });

    it('should get project by id', () => {
        const mockProject: Project = { id: 1, name: 'Test Project', description: 'Test Description', category: 'Web', url: '', assignedUsers: [], taskIds: [], issueIds: [] };

        service.getProjectById(1).subscribe(project => {
            expect(project).toEqual(mockProject);
        });

        const req = httpMock.expectOne('http://localhost:8081/project/get/1');
        expect(req.request.method).toBe('GET');
        req.flush(mockProject);
    });

    it('should add new project', () => {
        const mockProject: Project = { id: 1, name: 'Test Project', description: 'Test Description', category: 'Web', url: '', assignedUsers: [], taskIds: [], issueIds: [] };

        service.addProject(mockProject).subscribe();

        const req = httpMock.expectOne('http://localhost:8081/project/create');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(mockProject);
        req.flush(null);
    });

    it('should update project', () => {
        const mockProject: Project = { id: 1, name: 'Updated Project', description: 'Updated Description', category: 'Mobile', url: '', assignedUsers: [], taskIds: [], issueIds: [] };

        service.updateProject(mockProject).subscribe();

        const req = httpMock.expectOne(`http://localhost:8081/project/update/${mockProject.id}`);
        expect(req.request.method).toBe('PUT');
        expect(req.request.body).toEqual(mockProject);
        req.flush(null);
    });

    it('should delete project', () => {
        service.deleteProject(1).subscribe();

        const req = httpMock.expectOne('http://localhost:8081/project/delete/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

    it('should return categories', () => {
        const categories = service.getCategories();
        expect(categories).toEqual(['Web', 'Mobile', 'Desktop', 'Cloud']);
    });

    it('should handle errors', () => {
        service.getProjects().subscribe({
            error: (error) => {
                expect(error).toBeTruthy();
            }
        });

        const req = httpMock.expectOne('http://localhost:8081/project/getAll');
        req.error(new ErrorEvent('Network error'));
    });
});