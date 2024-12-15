import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationItemComponent } from './documentation-item.component';
import { DocumentCategory, DocumentStatus } from '../../models/documentation';

describe('DocumentationItemComponent', () => {
  let component: DocumentationItemComponent;
  let fixture: ComponentFixture<DocumentationItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocumentationItemComponent]
    })
    .compileComponents();

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
});
