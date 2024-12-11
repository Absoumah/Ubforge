import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProjectItemComponent } from './project-item.component';
import { Project } from '../../models/project.model';
import { User } from '../../../../core/models/user.model';

describe('ProjectItemComponent', () => {
  let component: ProjectItemComponent;
  let fixture: ComponentFixture<ProjectItemComponent>;

  const mockUser: User = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
  };

  const mockProject: Project = {
    id: 1,
    name: 'Test Project',
    url: 'http://example.com',
    category: 'Development',
    description: 'Test Description',
    assignedUsers: [mockUser],
    taskIds: [1, 2, 3],
    issueIds: [1, 2, 3],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectItemComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectItemComponent);
    component = fixture.componentInstance;

    // Set required input
    component.project = mockProject;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});