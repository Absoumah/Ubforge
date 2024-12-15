import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.currentPage).toBe(1);
    expect(component.totalPages).toBe(1);
  });

  it('should generate correct pages array', () => {
    component.totalPages = 3;
    expect(component.pages).toEqual([1, 2, 3]);
  });

  it('should emit pageChange event when changing to valid page', () => {
    component.totalPages = 5;
    spyOn(component.pageChange, 'emit');
    
    component.changePage(3);
    expect(component.pageChange.emit).toHaveBeenCalledWith(3);
  });

  it('should not emit pageChange event for invalid page numbers', () => {
    component.totalPages = 5;
    spyOn(component.pageChange, 'emit');
    
    component.changePage(0);
    component.changePage(6);
    expect(component.pageChange.emit).not.toHaveBeenCalled();
  });

  it('should disable Previous button on first page', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const prevButton = fixture.debugElement.nativeElement.querySelector('.pagination-button');
    expect(prevButton.disabled).toBeTruthy();
  });

  it('should disable Next button on last page', () => {
    component.currentPage = 5;
    component.totalPages = 5;
    fixture.detectChanges();
    const buttons = fixture.debugElement.nativeElement.querySelectorAll('.pagination-button');
    const nextButton = buttons[1];
    expect(nextButton.disabled).toBeTruthy();
  });
});
