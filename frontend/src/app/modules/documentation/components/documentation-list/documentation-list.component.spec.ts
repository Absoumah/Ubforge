import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DocumentationListComponent } from './documentation-list.component';
import { DocumentationService } from '../../services/documentation.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of } from 'rxjs';

describe('DocumentationListComponent', () => {
  let component: DocumentationListComponent;
  let fixture: ComponentFixture<DocumentationListComponent>;

  beforeEach(async () => {
    const mockDocService = { docs$: of([]) };
    const mockDialogService = { confirm: () => Promise.resolve(true) };
    const mockToastService = { success: () => {}, error: () => {} };
    const mockProjectStateService = {};

    await TestBed.configureTestingModule({
      imports: [DocumentationListComponent, HttpClientModule],
      providers: [
        { provide: DocumentationService, useValue: mockDocService },
        { provide: DialogService, useValue: mockDialogService },
        { provide: ToastService, useValue: mockToastService },
        { provide: ProjectStateService, useValue: mockProjectStateService }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
