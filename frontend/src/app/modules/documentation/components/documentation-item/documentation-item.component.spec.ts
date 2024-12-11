import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentationItemComponent } from './documentation-item.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
