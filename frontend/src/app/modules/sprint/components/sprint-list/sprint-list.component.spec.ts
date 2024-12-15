import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SprintListComponent } from './sprint-list.component';

describe('SprintListComponent', () => {
  let component: SprintListComponent;
  let fixture: ComponentFixture<SprintListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintListComponent, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SprintListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
