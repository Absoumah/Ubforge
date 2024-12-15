import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { IssueSelectorComponent } from './issue-selector.component';

describe('IssueSelectorComponent', () => {
  let component: IssueSelectorComponent;
  let fixture: ComponentFixture<IssueSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueSelectorComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssueSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
