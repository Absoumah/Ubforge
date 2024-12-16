import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap } from 'rxjs';
import { Sprint, SprintStatus } from '../models/sprint.interface';
import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SprintService } from './sprint.service';

describe('SprintService', () => {
    let service: SprintService;
    let httpMock: HttpTestingController;

    const mockSprint: Sprint = {
        id: 1,
        name: 'Sprint 1',
        projectId: 1,
        startDate: new Date(),
        endDate: new Date(), 
        status: SprintStatus.PLANNED,
        tasks: [],
        issues: []
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SprintService]
        });
        service = TestBed.inject(SprintService);
        httpMock = TestBed.inject(HttpTestingController);
        // Handle the initial GET request made in the constructor
        const req = httpMock.expectOne('http://localhost:8081/sprint/getAll');
        req.flush([]);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should load sprints on init', () => {
        const mockSprints = [mockSprint];
        
        // Trigger a new load
        service.loadSprints();
        
        const req = httpMock.expectOne('http://localhost:8081/sprint/getAll');
        expect(req.request.method).toBe('GET');
        req.flush(mockSprints);

        service.sprints$.subscribe(sprints => {
            expect(sprints).toEqual(mockSprints);
        });
    });

    it('should get sprints by project', () => {
        const projectId = 1;
        const mockProjectSprints = [mockSprint];
        
        service.getSprintsByProject(projectId).subscribe(sprints => {
            expect(sprints).toEqual(mockProjectSprints);
        });

        const req = httpMock.expectOne(`http://localhost:8081/sprint/project/${projectId}`);
        expect(req.request.method).toBe('GET');
        req.flush(mockProjectSprints);
    });

    it('should create sprint', () => {
        const newSprint = { ...mockSprint };

        service.createSprint(newSprint).subscribe(response => {
            expect(response).toEqual(mockSprint);
        });

        const req = httpMock.expectOne('http://localhost:8081/sprint/create');
        expect(req.request.method).toBe('POST');
        req.flush(mockSprint);
    });

    it('should update sprint', () => {
        service.updateSprint(mockSprint).subscribe(response => {
            expect(response).toEqual(mockSprint);
        });

        const req = httpMock.expectOne(`http://localhost:8081/sprint/update/${mockSprint.id}`);
        expect(req.request.method).toBe('PUT');
        req.flush(mockSprint);
    });

    it('should delete sprint', () => {
        service.deleteSprint(1).subscribe();

        const req = httpMock.expectOne('http://localhost:8081/sprint/delete/1');
        expect(req.request.method).toBe('DELETE');
        req.flush(null);
    });

    it('should add task to sprint', () => {
        service.addTaskToSprint(1, 1).subscribe();

        const req = httpMock.expectOne('http://localhost:8081/sprint/1/addTask/1');
        expect(req.request.method).toBe('PUT');
        req.flush({});
    });

    it('should add issue to sprint', () => {
        service.addIssueToSprint(1, 1).subscribe();

        const req = httpMock.expectOne('http://localhost:8081/sprint/1/addIssue/1');
        expect(req.request.method).toBe('PUT');
        req.flush({});
    });
});
