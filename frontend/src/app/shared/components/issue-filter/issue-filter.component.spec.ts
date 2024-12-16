import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueFilterComponent } from './issue-filter.component';
import { FilterService } from '../../services/filter.service';
import { BehaviorSubject } from 'rxjs';

describe('IssueFilterComponent', () => {
  let component: IssueFilterComponent;
  let fixture: ComponentFixture<IssueFilterComponent>;
  let filterService: jasmine.SpyObj<FilterService>;

  beforeEach(async () => {
    const filterServiceSpy = jasmine.createSpyObj('FilterService', ['updateFilter', 'getCurrentFilter', 'resetFilters']);
    filterServiceSpy.currentFilter$ = new BehaviorSubject({ category: null });
    filterServiceSpy.getCurrentFilter.and.returnValue({ category: null });

    await TestBed.configureTestingModule({
      imports: [IssueFilterComponent],
      providers: [
        { provide: FilterService, useValue: filterServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IssueFilterComponent);
    component = fixture.componentInstance;
    filterService = TestBed.inject(FilterService) as jasmine.SpyObj<FilterService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default categories', () => {
    expect(component.categories).toEqual(['BugFix', 'Feature', 'Enhancement', 'Documentation']);
  });

  it('should initialize selectedCategory as null', () => {
    expect(component.selectedCategory).toBeNull();
  });

  it('should update filter when category changes', () => {
    const category = 'BugFix';
    component.onCategoryChange(category);
    expect(filterService.updateFilter).toHaveBeenCalled();
  });

  it('should reset filters when resetFilter is called', () => {
    component.resetFilter();
    expect(filterService.resetFilters).toHaveBeenCalled();
  });

  it('should update selectedCategory when filter service emits new value', () => {
    const newFilter = { category: 'Feature' };
    (filterService.currentFilter$ as BehaviorSubject<any>).next(newFilter);
    expect(component.selectedCategory).toBe('Feature');
  });
});
