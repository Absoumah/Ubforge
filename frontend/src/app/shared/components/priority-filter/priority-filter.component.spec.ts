import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityFilterComponent } from './priority-filter.component';

describe('PriorityFilterComponent', () => {
  let component: PriorityFilterComponent;
  let fixture: ComponentFixture<PriorityFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriorityFilterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PriorityFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
