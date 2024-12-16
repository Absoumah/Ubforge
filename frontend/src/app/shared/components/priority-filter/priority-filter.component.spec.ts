import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PriorityFilterComponent } from './priority-filter.component';
import { FilterService } from '../../services/filter.service';
import { IssuePriority } from '../../../modules/issue/models/issue-priority.enum';
import { BehaviorSubject } from 'rxjs';

describe('PriorityFilterComponent', () => {
  let component: PriorityFilterComponent;
  let fixture: ComponentFixture<PriorityFilterComponent>;
  let filterService: jasmine.SpyObj<FilterService>;

  beforeEach(async () => {
    const filterServiceSpy = jasmine.createSpyObj('FilterService', ['updateFilter', 'getCurrentFilter']);
    filterServiceSpy.currentFilter$ = new BehaviorSubject({ priority: null });
    filterServiceSpy.getCurrentFilter.and.returnValue({ priority: null });

    await TestBed.configureTestingModule({
      imports: [PriorityFilterComponent],
      providers: [
        { provide: FilterService, useValue: filterServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PriorityFilterComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService) as jasmine.SpyObj<FilterService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize priorities with IssuePriority values', () => {
    expect(component.priorities).toEqual(Object.values(IssuePriority));
  });

  it('should update selectedPriority when filter service emits new value', () => {
    const newPriority = IssuePriority.HIGH;
    (filterService.currentFilter$ as BehaviorSubject<any>).next({ priority: newPriority });
    expect(component.selectedPriority).toBe(newPriority);
  });
});
