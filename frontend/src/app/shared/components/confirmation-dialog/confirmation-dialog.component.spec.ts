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
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with empty title and message', () => {
    expect(component.title).toBe('');
    expect(component.message).toBe('');
  });

  it('should handle empty strings for title and message', () => {
    component.title = '';
    component.message = '';
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toBe('');
    expect(compiled.querySelector('.dialog-content p').textContent).toBe('');
  });

  it('should update view when inputs change', () => {
    component.title = 'Initial Title';
    fixture.detectChanges();
    
    let compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('Initial Title');
    
    component.title = 'Updated Title';
    fixture.detectChanges();
    
    expect(compiled.querySelector('h2').textContent).toContain('Updated Title');
  });

  it('should emit events only once per click', () => {
    const confirmSpy = spyOn(component.confirm, 'emit');
    const cancelSpy = spyOn(component.cancel, 'emit');
    
    const confirmButton = fixture.nativeElement.querySelector('.btn-primary');
    const cancelButton = fixture.nativeElement.querySelector('.btn-secondary');

    confirmButton.click();
    confirmButton.click();
    expect(confirmSpy).toHaveBeenCalledTimes(2);

    cancelButton.click();
    cancelButton.click();
    expect(cancelSpy).toHaveBeenCalledTimes(2);
  });

  it('should handle long text content properly', () => {
    const longTitle = 'A'.repeat(100);
    const longMessage = 'B'.repeat(500);
    
    component.title = longTitle;
    component.message = longMessage;
    fixture.detectChanges();

    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain(longTitle);
    expect(compiled.querySelector('.dialog-content p').textContent).toContain(longMessage);
  });
});