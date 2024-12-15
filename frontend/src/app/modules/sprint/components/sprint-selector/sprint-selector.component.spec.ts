import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SprintSelectorComponent } from './sprint-selector.component';
import { SprintService } from '../../services/sprint.service';

describe('SprintSelectorComponent', () => {
  let component: SprintSelectorComponent;
  let fixture: ComponentFixture<SprintSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintSelectorComponent, HttpClientTestingModule],
      providers: [SprintService]
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
