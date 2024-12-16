import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SprintItemComponent } from './sprint-item.component';
import { SprintService } from '../../services/sprint.service';
import { Sprint, SprintStatus } from '../../models/sprint.interface';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';

describe('SprintItemComponent', () => {
    let component: SprintItemComponent;
    let fixture: ComponentFixture<SprintItemComponent>;
    let sprintService: jasmine.SpyObj<SprintService>;
    let router: jasmine.SpyObj<Router>;

    const mockSprint: Sprint = {
        id: 1,
        name: 'Test Sprint',
        projectId: 1,
        startDate: new Date(),
        endDate: new Date(),
        status: SprintStatus.ACTIVE,
        description: 'Test Description',
        tasks: [1, 2],
        issues: [1]
    };

    beforeEach(async () => {
        const sprintServiceSpy = jasmine.createSpyObj('SprintService', [
            'getSprint',
            'getSprintProgress',
            'getTotalTasksForSprint'
        ]);
        const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

        await TestBed.configureTestingModule({
            imports: [SprintItemComponent, ProgressBarComponent],
            providers: [
                { provide: SprintService, useValue: sprintServiceSpy },
                { provide: Router, useValue: routerSpy }
            ]
        }).compileComponents();

        sprintService = TestBed.inject(SprintService) as jasmine.SpyObj<SprintService>;
        router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    });

    beforeEach(() => {
        sprintService.getSprint.and.returnValue(of(mockSprint));
        sprintService.getSprintProgress.and.returnValue(of(50));
        sprintService.getTotalTasksForSprint.and.returnValue(of(2));
        
        fixture = TestBed.createComponent(SprintItemComponent);
        component = fixture.componentInstance;
        component.sprint = mockSprint;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load sprint data on init', () => {
        component.ngOnInit();
        expect(sprintService.getSprint).toHaveBeenCalledWith(mockSprint.id);
        expect(sprintService.getSprintProgress).toHaveBeenCalledWith(mockSprint.id);
        expect(sprintService.getTotalTasksForSprint).toHaveBeenCalledWith(mockSprint.id);
    });

    it('should load sprint by id when sprintId is set', () => {
        component.sprintId = 1;
        expect(sprintService.getSprint).toHaveBeenCalledWith(1);
    });

    it('should return correct status class', () => {
        expect(component.statusClass).toBe(mockSprint.status.toLowerCase());
    });

    it('should emit edit event', () => {
        spyOn(component.edit, 'emit');
        const event = new Event('click');
        component.editSprint(event);
        expect(component.edit.emit).toHaveBeenCalledWith(mockSprint.id);
    });

    it('should emit delete event', () => {
        spyOn(component.delete, 'emit');
        const event = new Event('click');
        component.deleteSprint(event);
        expect(component.delete.emit).toHaveBeenCalledWith(mockSprint.id);
    });

    it('should navigate to sprint details', () => {
        component.viewSprint();
        expect(router.navigate).toHaveBeenCalledWith(['/sprints', mockSprint.id]);
    });
});