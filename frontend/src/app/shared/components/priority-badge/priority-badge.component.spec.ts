import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriorityBadgeComponent } from './priority-badge.component';
import { IssuePriority } from '../../../modules/issue/models/issue-priority.enum';

describe('PriorityBadgeComponent', () => {
  let component: PriorityBadgeComponent;
  let fixture: ComponentFixture<PriorityBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityBadgeComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PriorityBadgeComponent);
    component = fixture.componentInstance;
    
    // Provide required input
    component.priority = IssuePriority.MEDIUM;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display priority text', () => {
    const badgeElement = fixture.nativeElement.querySelector('.badge');
    expect(badgeElement.textContent.trim()).toBe(IssuePriority.MEDIUM);
  });

  it('should apply correct priority class', () => {
    const badgeElement = fixture.nativeElement.querySelector('.badge');
    expect(badgeElement.classList.contains('priority-medium')).toBeTruthy();
  });

  it('should update class when priority changes', () => {
    component.priority = IssuePriority.HIGH;
    fixture.detectChanges();

    const badgeElement = fixture.nativeElement.querySelector('.badge');
    expect(badgeElement.classList.contains('priority-high')).toBeTruthy();
  });

  it('should have priority and badge classes', () => {
    const badgeElement = fixture.nativeElement.querySelector('.badge');
    expect(badgeElement.classList.contains('priority')).toBeTruthy();
    expect(badgeElement.classList.contains('badge')).toBeTruthy();
  });

  it('should update text content when priority changes', () => {
    component.priority = IssuePriority.LOW;
    fixture.detectChanges();
    
    const badgeElement = fixture.nativeElement.querySelector('.badge');
    expect(badgeElement.textContent.trim()).toBe(IssuePriority.LOW);
  });

  it('should return correct class from getPriorityClass method', () => {
    expect(component.getPriorityClass()).toBe('priority-medium');
    
    component.priority = IssuePriority.HIGH;
    expect(component.getPriorityClass()).toBe('priority-high');
    
    component.priority = IssuePriority.LOW;
    expect(component.getPriorityClass()).toBe('priority-low');
  });
});