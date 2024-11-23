import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

describe('ConfirmationDialogComponent', () => {
  let component: ConfirmationDialogComponent;
  let fixture: ComponentFixture<ConfirmationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ConfirmationDialogComponent,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display correct input values', () => {
    component.title = 'Test Title';
    component.message = 'Test Message';
    component.confirmText = 'Yes';
    component.cancelText = 'No';

    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Test Title');
    expect(compiled.querySelector('.dialog-content p').textContent).toContain('Test Message');
    expect(compiled.querySelector('.btn-primary').textContent.trim()).toBe('Yes');
    expect(compiled.querySelector('.btn-secondary').textContent.trim()).toBe('No');
  });

  it('should emit confirm event when confirm button clicked', () => {
    const confirmSpy = spyOn(component.confirm, 'emit');
    const confirmButton = fixture.nativeElement.querySelector('.btn-primary');

    confirmButton.click();
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should emit cancel event when cancel button clicked', () => {
    const cancelSpy = spyOn(component.cancel, 'emit');
    const cancelButton = fixture.nativeElement.querySelector('.btn-secondary');

    cancelButton.click();
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should use default button text if not provided', () => {
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.btn-primary').textContent.trim()).toBe('Confirm');
    expect(compiled.querySelector('.btn-secondary').textContent.trim()).toBe('Cancel');
  });
});