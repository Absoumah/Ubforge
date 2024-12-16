import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgressBarComponent } from './progress-bar.component';

describe('ProgressBarComponent', () => {
  let component: ProgressBarComponent;
  let fixture: ComponentFixture<ProgressBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProgressBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default progress value of 0', () => {
    expect(component.progress).toBe(0);
  });

  it('should have default showLabel value of true', () => {
    expect(component.showLabel).toBe(true);
  });

  it('should update progress when input changes', () => {
    component.progress = 50;
    fixture.detectChanges();
    const progressElement = fixture.nativeElement.querySelector('.progress');
    expect(progressElement.style.width).toBe('50%');
  });

  it('should show label when showLabel is true', () => {
    component.progress = 75;
    component.showLabel = true;
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.label');
    expect(labelElement.textContent).toContain('75%');
  });

  it('should hide label when showLabel is false', () => {
    component.showLabel = false;
    fixture.detectChanges();
    const labelElement = fixture.nativeElement.querySelector('.label');
    expect(labelElement).toBeNull();
  });
});
