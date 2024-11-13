import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueItemComponent } from './issue-item.component';

describe('IssueItemComponent', () => {
  let component: IssueItemComponent;
  let fixture: ComponentFixture<IssueItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
