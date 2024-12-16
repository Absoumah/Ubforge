import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { DocumentationItemComponent } from './documentation-item.component';
import { DocumentCategory, DocumentStatus } from '../../models/documentation';

describe('DocumentationItemComponent', () => {
  let component: DocumentationItemComponent;
  let fixture: ComponentFixture<DocumentationItemComponent>;
  let router: Router;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    await TestBed.configureTestingModule({
      imports: [DocumentationItemComponent],
      providers: [
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();

    router = TestBed.inject(Router);
    fixture = TestBed.createComponent(DocumentationItemComponent);
    component = fixture.componentInstance;
    component.doc = {
      id: 1,
      title: 'Test Doc',
      content: 'Test Content', 
      category: DocumentCategory.GENERAL,
      author: 'Test Author',
      createdAt: new Date(),
      updatedAt: new Date(),
      projectId: 1,
      status: DocumentStatus.PUBLISHED,
      tags: ['test'],
      comments: [],
      version: '1.0'
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit edit event with document id', () => {
    spyOn(component.edit, 'emit');
    component.onEdit();
    expect(component.edit.emit).toHaveBeenCalledWith(1);
  });

  it('should emit delete event with document id', () => {
    spyOn(component.delete, 'emit');
    component.onDelete();
    expect(component.delete.emit).toHaveBeenCalledWith(1);
  });

  it('should navigate to documentation detail on view', () => {
    component.onView();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/documentation', 1]);
  });

  it('should toggle expansion state', () => {
    expect(component.isExpanded).toBeFalsy();
    component.toggleExpand();
    expect(component.isExpanded).toBeTruthy();
    component.toggleExpand();
    expect(component.isExpanded).toBeFalsy();
  });

  it('should have correct input document', () => {
    expect(component.doc.title).toBe('Test Doc');
    expect(component.doc.category).toBe(DocumentCategory.GENERAL);
    expect(component.doc.status).toBe(DocumentStatus.PUBLISHED);
  });
});
