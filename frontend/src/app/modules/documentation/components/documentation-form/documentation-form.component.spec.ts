import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DocumentationFormComponent } from './documentation-form.component';
import { DocumentationService } from '../../services/documentation.service';
import { ToastService } from '../../../../shared/services/toast.service';
import { ProjectStateService } from '../../../project/services/project-state.service';

describe('DocumentationFormComponent', () => {
  let component: DocumentationFormComponent;
  let fixture: ComponentFixture<DocumentationFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationFormComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [
        DocumentationService,
        ToastService,
        ProjectStateService
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocumentationFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
