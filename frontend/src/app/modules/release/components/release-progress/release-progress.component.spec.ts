import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReleaseProgressComponent } from './release-progress.component';

describe('ReleaseProgressComponent', () => {
  let component: ReleaseProgressComponent;
  let fixture: ComponentFixture<ReleaseProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReleaseProgressComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReleaseProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
