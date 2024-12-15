import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAvatarComponent } from './user-avatar.component';

describe('UserAvatarComponent', () => {
  let component: UserAvatarComponent;
  let fixture: ComponentFixture<UserAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAvatarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display initials input in the template', () => {
    const testInitials = 'JD';
    component.initials = testInitials;
    fixture.detectChanges();
    const avatarElement = fixture.nativeElement.querySelector('.user-avatar');
    expect(avatarElement.textContent.trim()).toBe(testInitials);
  });

  it('should have correct CSS classes for styling', () => {
    const avatarElement = fixture.nativeElement.querySelector('.user-avatar');
    expect(avatarElement).toBeTruthy();
    expect(avatarElement.classList.contains('user-avatar')).toBeTruthy();
  });

  it('should handle empty initials', () => {
    component.initials = '';
    fixture.detectChanges();
    const avatarElement = fixture.nativeElement.querySelector('.user-avatar');
    expect(avatarElement.textContent.trim()).toBe('');
  });
});
