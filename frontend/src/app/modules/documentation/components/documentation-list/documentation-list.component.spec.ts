import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { DocumentationListComponent } from './documentation-list.component';
import { DocumentationService } from '../../services/documentation.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { Documentation, DocumentCategory, DocumentStatus } from '../../models/documentation';

describe('DocumentationListComponent', () => {
  let component: DocumentationListComponent;
  let fixture: ComponentFixture<DocumentationListComponent>;
  let mockDocService: jasmine.SpyObj<DocumentationService>;
  let mockDialogService: jasmine.SpyObj<DialogService>;
  let mockToastService: jasmine.SpyObj<ToastService>;
  let mockRouter: jasmine.SpyObj<Router>;

  const mockDocs: Documentation[] = [
    {
      id: 1,
      title: 'Test Doc',
      content: 'Test Content',
      category: DocumentCategory.TECHNICAL,
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: 1,
      status: DocumentStatus.PUBLISHED
    }
  ];

  beforeEach(async () => {
    mockDocService = jasmine.createSpyObj('DocumentationService', ['deleteDoc']);
    mockDocService.docs$ = of(mockDocs);
    mockDialogService = jasmine.createSpyObj('DialogService', ['confirm']);
    mockToastService = jasmine.createSpyObj('ToastService', ['success', 'error']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    const mockProjectStateService = {};

    await TestBed.configureTestingModule({
      imports: [DocumentationListComponent, HttpClientModule],
      providers: [
        { provide: DocumentationService, useValue: mockDocService },
        { provide: DialogService, useValue: mockDialogService },
        { provide: ToastService, useValue: mockToastService },
        { provide: Router, useValue: mockRouter },
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

  it('should navigate to create documentation page', () => {
    component.createDoc();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/documentation/create']);
  });

  it('should navigate to edit documentation page', () => {
    component.onEdit(1);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/documentation/edit', 1]);
  });

  it('should delete documentation when confirmed', async () => {
    mockDialogService.confirm.and.returnValue(Promise.resolve(true));
    mockDocService.deleteDoc.and.returnValue(of(void 0));

    await component.onDelete(1);

    expect(mockDialogService.confirm).toHaveBeenCalled();
    expect(mockDocService.deleteDoc).toHaveBeenCalledWith(1);
    expect(mockToastService.success).toHaveBeenCalledWith('Documentation deleted successfully');
  });

  it('should not delete documentation when not confirmed', async () => {
    mockDialogService.confirm.and.returnValue(Promise.resolve(false));

    await component.onDelete(1);

    expect(mockDialogService.confirm).toHaveBeenCalled();
    expect(mockDocService.deleteDoc).not.toHaveBeenCalled();
  });
});
