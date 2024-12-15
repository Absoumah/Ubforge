import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReleaseListComponent } from './release-list.component';
import { ReleaseService } from '../../services/release.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of } from 'rxjs';

describe('ReleaseListComponent', () => {
  let component: ReleaseListComponent;
  let fixture: ComponentFixture<ReleaseListComponent>;

  const mockReleaseService = {
    getReleases: jasmine.createSpy('getReleases').and.returnValue(of([])),
    deleteRelease: jasmine.createSpy('deleteRelease').and.returnValue(of(void 0))
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error'),
    info: jasmine.createSpy('info')
  };

  const mockDialogService = {
    confirm: jasmine.createSpy('confirm').and.returnValue(Promise.resolve(true))
  };

  const mockProjectStateService = {
    getActiveProjectId: jasmine.createSpy('getActiveProjectId').and.returnValue(of(1))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReleaseListComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ReleaseService, useValue: mockReleaseService },
        { provide: ToastService, useValue: mockToastService },
        { provide: DialogService, useValue: mockDialogService },
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases as needed
});