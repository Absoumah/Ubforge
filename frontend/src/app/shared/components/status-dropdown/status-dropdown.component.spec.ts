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
    statusItems[1].click();
    fixture.detectChanges();
    expect(component.currentStatus).toBe('IN_PROGRESS');
  });

  it('should close dropdown when selecting same status', () => {
    component.isOpen = true;
    fixture.detectChanges();
    component.selectStatus(TaskStatus.TODO);
    expect(component.isOpen).toBeFalse();
  });

  it('should emit status change event when selecting new status', () => {
    spyOn(component.statusChange, 'emit');
    component.selectStatus(TaskStatus.IN_PROGRESS);
    expect(component.statusChange.emit).toHaveBeenCalledWith(TaskStatus.IN_PROGRESS);
  });

  it('should not emit status change event when selecting same status', () => {
    spyOn(component.statusChange, 'emit');
    component.selectStatus(TaskStatus.TODO);
    expect(component.statusChange.emit).not.toHaveBeenCalled();
  });

  it('should apply correct status class', () => {
    expect(component.getStatusClass(TaskStatus.TODO)).toBe('status-todo');
    expect(component.getStatusClass(TaskStatus.IN_PROGRESS)).toBe('status-in_progress');
    expect(component.getStatusClass(TaskStatus.COMPLETED)).toBe('status-completed');
  });

  it('should display all available statuses in dropdown', () => {
    component.isOpen = true;
    fixture.detectChanges();
    const dropdownItems = fixture.nativeElement.querySelectorAll('.dropdown-item');
    expect(dropdownItems.length).toBe(Object.values(TaskStatus).length);
  });
});