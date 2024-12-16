import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentFormComponent } from './comment-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('CommentFormComponent', () => {
  let component: CommentFormComponent;
  let fixture: ComponentFixture<CommentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentFormComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty comment form', () => {
    expect(component.commentForm.get('content')?.value).toBe('');
  });

  it('should validate required field', () => {
    const contentControl = component.commentForm.get('content');
    expect(contentControl?.valid).toBeFalsy();
    expect(contentControl?.errors?.['required']).toBeTruthy();
  });

  it('should validate max length', () => {
    const contentControl = component.commentForm.get('content');
    contentControl?.setValue('a'.repeat(501));
    expect(contentControl?.errors?.['maxlength']).toBeTruthy();
  });

  it('should emit comment content on valid form submission', () => {
    spyOn(component.submitComment, 'emit');
    const testComment = 'Test comment';
    component.commentForm.get('content')?.setValue(testComment);
    
    component.onSubmit();
    
    expect(component.submitComment.emit).toHaveBeenCalledWith(testComment);
  });
  
  it('should not emit or reset if form is invalid', () => {
    spyOn(component.submitComment, 'emit');
    component.onSubmit();
    
    expect(component.submitComment.emit).not.toHaveBeenCalled();
  });
});
