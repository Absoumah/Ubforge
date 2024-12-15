import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, provideRouter, withRouterConfig } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { SprintDetailComponent } from './sprint-detail.component';
import { SprintService } from '../../services/sprint.service';
import { IssueService } from '../../../issue/services/issue.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { Sprint, SprintStatus } from '../../models/sprint.interface';
import { IssuePriority } from '../../../issue/models/issue-priority.enum';

describe('SprintDetailComponent', () => {
    let component: SprintDetailComponent;
    let fixture: ComponentFixture<SprintDetailComponent>;
    let sprintService: jasmine.SpyObj<SprintService>;
    let issueService: jasmine.SpyObj<IssueService>;
    let toastService: jasmine.SpyObj<ToastService>;
    let dialogService: jasmine.SpyObj<DialogService>;

    const mockSprint: Sprint = {
        id: 1,
        name: 'Test Sprint',
        projectId: 1,
        startDate: new Date(),
        endDate: new Date(),
        status: SprintStatus.ACTIVE,
        description: 'Test Description',
        tasks: [1, 2],
        issues: [1, 2]
    };

    const mockIssues = [
        { id: 1, title: 'Issue 1', category: 'BugFix', description: '', reportedDate: new Date(), dueDate: new Date(), tasks: [], projectId: 1, priority: IssuePriority.HIGH },
        { id: 2, title: 'Issue 2', category: 'Feature', description: '', reportedDate: new Date(), dueDate: new Date(), tasks: [], projectId: 1, priority: IssuePriority.MEDIUM }
    ];

    beforeEach(async () => {
        const sprintServiceSpy = jasmine.createSpyObj('SprintService', ['getSprint', 'deleteSprint']);
        const issueServiceSpy = jasmine.createSpyObj('IssueService', ['getIssues']);
        const toastServiceSpy = jasmine.createSpyObj('ToastService', ['success', 'error']);
        const dialogServiceSpy = jasmine.createSpyObj('DialogService', ['confirm']);

        await TestBed.configureTestingModule({
            imports: [
                SprintDetailComponent,
                BrowserAnimationsModule,
                HttpClientTestingModule
            ],

               
            providers: [
                provideRouter([], withRouterConfig({ paramsInheritanceStrategy: 'always' })),
                { provide: SprintService, useValue: sprintServiceSpy },
                { provide: IssueService, useValue: issueServiceSpy },
                { provide: ToastService, useValue: toastServiceSpy },
                { provide: DialogService, useValue: dialogServiceSpy },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        snapshot: {
                            paramMap: {
                                get: () => '1'
                            }
                        }
                    }
                }
            ]
        }).compileComponents();

        sprintService = TestBed.inject(SprintService) as jasmine.SpyObj<SprintService>;
        issueService = TestBed.inject(IssueService) as jasmine.SpyObj<IssueService>;
        toastService = TestBed.inject(ToastService) as jasmine.SpyObj<ToastService>;
        dialogService = TestBed.inject(DialogService) as jasmine.SpyObj<DialogService>;

        sprintService.getSprint.and.returnValue(of(mockSprint));
        issueService.getIssues.and.returnValue(of(mockIssues));

        fixture = TestBed.createComponent(SprintDetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load sprint and related issues on init', () => {
        expect(component.sprint).toEqual(mockSprint);
        expect(component.relatedIssues).toEqual(mockIssues);
        expect(sprintService.getSprint).toHaveBeenCalledWith(1);
        expect(issueService.getIssues).toHaveBeenCalled();
    });

    it('should toggle issues expansion state', () => {
        expect(component.isIssuesExpanded).toBeFalse();
        component.toggleIssues();
        expect(component.isIssuesExpanded).toBeTrue();
        component.toggleIssues();
        expect(component.isIssuesExpanded).toBeFalse();
    });

    it('should navigate to edit page when onEdit is called', () => {
        const routerSpy = spyOn(component['router'], 'navigate');
        component.sprint = mockSprint;
        component.onEdit();
        expect(routerSpy).toHaveBeenCalledWith(['/sprints/edit', mockSprint.id]);
    });

    it('should delete sprint after confirmation', async () => {
        dialogService.confirm.and.returnValue(Promise.resolve(true));
        sprintService.deleteSprint.and.returnValue(of(void 0));
        const routerSpy = spyOn(component['router'], 'navigate');
        
        component.sprint = mockSprint;
        await component.onDelete();

        expect(dialogService.confirm).toHaveBeenCalled();
        expect(sprintService.deleteSprint).toHaveBeenCalledWith(mockSprint.id);
        expect(toastService.success).toHaveBeenCalledWith('Sprint deleted successfully');
        expect(routerSpy).toHaveBeenCalledWith(['/sprints']);
    });

    it('should not delete sprint if not confirmed', async () => {
        dialogService.confirm.and.returnValue(Promise.resolve(false));
        component.sprint = mockSprint;
        await component.onDelete();
        
        expect(sprintService.deleteSprint).not.toHaveBeenCalled();
        expect(toastService.success).not.toHaveBeenCalled();
    });
});