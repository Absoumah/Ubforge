import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActiveProjectBadgeComponent } from './active-project-badge.component';

describe('ActiveProjectBadgeComponent', () => {
  let component: ActiveProjectBadgeComponent;
  let fixture: ComponentFixture<ActiveProjectBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveProjectBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveProjectBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should default isActive to false', () => {
    expect(component.isActive).toBeFalse();
  });

  it('should display "Inactive" text when isActive is false', () => {
    component.isActive = false;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Inactive');
  });

  it('should display "Active" text when isActive is true', () => {
    component.isActive = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Active');
  });

  it('should have "is-active" class when isActive is true', () => {
    component.isActive = true;
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.active-badge');
    expect(badge.classList.contains('is-active')).toBeTrue();
  });

  it('should not have "is-active" class when isActive is false', () => {
    component.isActive = false;
    fixture.detectChanges();
    const badge = fixture.nativeElement.querySelector('.active-badge');
    expect(badge.classList.contains('is-active')).toBeFalse();
  });
});
