import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlimSidebarComponent } from './slim-sidebar.component';

describe('SlimSidebarComponent', () => {
  let component: SlimSidebarComponent;
  let fixture: ComponentFixture<SlimSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlimSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlimSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
