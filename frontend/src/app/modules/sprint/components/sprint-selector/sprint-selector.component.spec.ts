import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintSelectorComponent } from './sprint-selector.component';

describe('SprintSelectorComponent', () => {
  let component: SprintSelectorComponent;
  let fixture: ComponentFixture<SprintSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
