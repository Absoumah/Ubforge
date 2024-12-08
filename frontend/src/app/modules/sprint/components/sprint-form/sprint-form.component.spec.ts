import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { SprintFormComponent } from './sprint-form.component';
import { SprintService } from '../../services/sprint.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { SprintStatus } from '../../models/sprint.interface';
import { of } from 'rxjs';

describe('SprintFormComponent', () => {
  let component: SprintFormComponent;
  let fixture: ComponentFixture<SprintFormComponent>;

  const mockSprintService = {
    getSprint: jasmine.createSpy('getSprint').and.returnValue(of(null)),
    createSprint: jasmine.createSpy('createSprint'),
    updateSprint: jasmine.createSpy('updateSprint')
  };

  const mockToastService = {
    success: jasmine.createSpy('success'),
    error: jasmine.createSpy('error')
  };

  const mockProjectStateService = {
    getActiveProjectId: jasmine.createSpy('getActiveProjectId').and.returnValue(of('1'))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SprintFormComponent,
        RouterTestingModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: SprintService, useValue: mockSprintService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SprintFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});