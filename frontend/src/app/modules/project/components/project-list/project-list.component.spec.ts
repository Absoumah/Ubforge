import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProjectListComponent } from './project-list.component';
import { ProjectService } from '../../services/project.service';
import { DialogService } from '../../../../shared/services/dialog.service';
import { ToastService } from '../../../../shared/services/toast.service';

describe('ProjectListComponent', () => {
  let component: ProjectListComponent;
  let fixture: ComponentFixture<ProjectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [ProjectService, DialogService, ToastService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
