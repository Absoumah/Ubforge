import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveProjectBadgeComponent } from './active-project-badge.component';

describe('ActiveProjectBadgeComponent', () => {
  let component: ActiveProjectBadgeComponent;
  let fixture: ComponentFixture<ActiveProjectBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActiveProjectBadgeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveProjectBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
