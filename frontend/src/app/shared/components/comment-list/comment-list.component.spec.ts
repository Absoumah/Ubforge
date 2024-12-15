import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommentListComponent } from './comment-list.component';
import { Comment } from '../../models/comment';

describe('CommentListComponent', () => {
  let component: CommentListComponent;
  let fixture: ComponentFixture<CommentListComponent>;
  
  const mockComments: Comment[] = [
    { id: 1, entityId: 1, entityType: 'post', author: 'John', content: 'Test comment 1', createdAt: new Date() },
    { id: 2, entityId: 1, entityType: 'post', author: 'Jane', content: 'Test comment 2', createdAt: new Date() }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommentListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display comments when provided', () => {
    component.comments = mockComments;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelectorAll('.comment-item').length).toBe(2);
  });

  it('should display correct comment count', () => {
    component.comments = mockComments;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('h3').textContent).toContain('Comments (2)');
  });

  it('should emit deleteComment event when onDeleteComment is called', () => {
    spyOn(component.deleteComment, 'emit');
    component.onDeleteComment(1);
    expect(component.deleteComment.emit).toHaveBeenCalledWith(1);
  });

  it('should display author and content for each comment', () => {
    component.comments = mockComments;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    const commentElements = compiled.querySelectorAll('.comment-item');
    
    expect(commentElements[0].querySelector('.author').textContent).toContain('John');
    expect(commentElements[0].querySelector('.content').textContent).toContain('Test comment 1');
    expect(commentElements[1].querySelector('.author').textContent).toContain('Jane');
    expect(commentElements[1].querySelector('.content').textContent).toContain('Test comment 2');
  });
});
