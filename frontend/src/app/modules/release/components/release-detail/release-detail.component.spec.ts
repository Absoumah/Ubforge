import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, ActivatedRoute, convertToParamMap } from '@angular/router';
import { ReleaseDetailComponent } from './release-detail.component';
import { ReleaseService } from '../../services/release.service';
import { IssueService } from '../../../issue/services/issue.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Release, ReleaseStatus } from '../../models/release';
import { of, throwError } from 'rxjs';

describe('ReleaseDetailComponent', () => {
  let component: ReleaseDetailComponent;
  let fixture: ComponentFixture<ReleaseDetailComponent>;

  const mockRelease: Release = {
    id: 1,
    version: '1.0.0',
    name: 'Test Release',
    description: 'Test Description',
    releaseDate: '2024-03-20',
    status: ReleaseStatus.PLANNED,
    projectId: 1,
    sprintIds: [],
  };

  const mockReleaseService = {
    getReleaseById: jasmine.createSpy('getReleaseById').and.returnValue(of(mockRelease)),
    deleteRelease: jasmine.createSpy('deleteRelease').and.returnValue(of({}))
  };

  const mockIssueService = {
    getIssues: jasmine.createSpy('getIssues').and.returnValue(of([]))
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  const mockDialogService = {
    confirm: jasmine.createSpy('confirm').and.returnValue(Promise.resolve(true))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReleaseDetailComponent,
        BrowserAnimationsModule
      ],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap({ id: '1' })
            }
          }
        },
        { provide: ReleaseService, useValue: mockReleaseService },
        { provide: IssueService, useValue: mockIssueService },
        { provide: ToastService, useValue: mockToastService },
        { provide: DialogService, useValue: mockDialogService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load release on init', () => {
    expect(mockReleaseService.getReleaseById).toHaveBeenCalledWith(1);
    expect(component.release).toEqual(mockRelease);
  });

  it('should toggle sprints expansion', () => {
    component.isSprintsExpanded = true;
    component.toggleSprints();
    expect(component.isSprintsExpanded).toBeFalse();
    component.toggleSprints();
    expect(component.isSprintsExpanded).toBeTrue();
  });

  it('should navigate to edit release', () => {
    const routerSpy = spyOn(component['router'], 'navigate');
    component.onEdit();
    expect(routerSpy).toHaveBeenCalledWith(['/releases/edit', mockRelease.id]);
  });

  it('should handle delete release error', async () => {
    mockReleaseService.deleteRelease.and.returnValue(throwError(() => new Error('Failed to delete')));
    await component.onDelete();
    expect(mockToastService.error).toHaveBeenCalledWith('Failed to delete release');
  });

  
});