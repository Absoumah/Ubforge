import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast.component';
import { ToastType } from '../../models/toast.model';

describe('ToastComponent', () => {
  let component: ToastComponent;
  let fixture: ComponentFixture<ToastComponent>;

  const mockToast = {
    id: 1,
    type: 'success' as ToastType,
    message: 'Test message',
    title: 'Test Title'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ToastComponent,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ToastComponent);
    component = fixture.componentInstance;

    // Set required input
    component.toast = mockToast;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render toast message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toast-message').textContent).toContain('Test message');
  });

  it('should have correct CSS class based on toast type', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.toast').classList).toContain('success');
  });

  it('should emit closed event with toast id when close button is clicked', () => {
    spyOn(component.closed, 'emit');
    const compiled = fixture.nativeElement;
    const closeButton = compiled.querySelector('.toast-close');
    
    closeButton.click();
    
    expect(component.closed.emit).toHaveBeenCalledWith(mockToast.id);
  });

  it('should emit closed event with toast id when toast is clicked', () => {
    spyOn(component.closed, 'emit');
    const compiled = fixture.nativeElement;
    const toast = compiled.querySelector('.toast');
    
    toast.click();
    
    expect(component.closed.emit).toHaveBeenCalledWith(mockToast.id);
  });
});