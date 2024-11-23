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
});