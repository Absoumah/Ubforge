import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintItemComponent } from './sprint-item.component';

describe('SprintItemComponent', () => {
  let component: SprintItemComponent;
  let fixture: ComponentFixture<SprintItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
