import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ProjectSwitcherComponent } from './project-switcher.component';
import { ProjectService } from '../../services/project.service';
import { ProjectStateService } from '../../services/project-state.service';

describe('ProjectSwitcherComponent', () => {
  let component: ProjectSwitcherComponent;
  let fixture: ComponentFixture<ProjectSwitcherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectSwitcherComponent, HttpClientModule],
      providers: [ProjectService, ProjectStateService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectSwitcherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
