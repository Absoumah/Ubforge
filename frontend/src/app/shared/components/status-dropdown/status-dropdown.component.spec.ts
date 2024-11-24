import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusDropdownComponent } from './status-dropdown.component';
import { TaskStatus } from '../../../modules/tasks/models/task-status.enum';

describe('StatusDropdownComponent', () => {
  let component: StatusDropdownComponent;
  let fixture: ComponentFixture<StatusDropdownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusDropdownComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(StatusDropdownComponent);
    component = fixture.componentInstance;

    // Initialize required properties
    component.currentStatus = TaskStatus.TODO;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display current status', () => {
    const badgeElement = fixture.nativeElement.querySelector('.badge span');
    expect(badgeElement.textContent.trim()).toBe('TODO');
  });

  it('should toggle dropdown on click', () => {
    const badge = fixture.nativeElement.querySelector('.badge');
    badge.click();
    fixture.detectChanges();

    expect(component.isOpen).toBeTruthy();
    expect(fixture.nativeElement.querySelector('.dropdown-menu')).toBeTruthy();
  });

  it('should change status on selection', () => {
    component.isOpen = true;
    fixture.detectChanges();

    const statusItems = fixture.nativeElement.querySelectorAll('.dropdown-item');
    statusItems[1].click(); // Click 'IN_PROGRESS'
    fixture.detectChanges();

    expect(component.currentStatus).toBe('IN_PROGRESS');
  });
});