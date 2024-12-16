import { TestBed } from '@angular/core/testing';
import { FilterService } from './filter.service';
import { IssueFilter } from '../models/filter.model';

describe('FilterService', () => {
    let service: FilterService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [FilterService]
        });
        service = TestBed.inject(FilterService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should initialize with default filter values', () => {
        service.currentFilter$.subscribe(filter => {
            expect(filter).toEqual({
                category: null,
                priority: null
            });
        });
    });

    it('should update filter', () => {
        const newFilter: IssueFilter = {
            category: 'BugFix',
            priority: 'HIGH'
        };

        service.updateFilter(newFilter);

        expect(service.getCurrentFilter()).toEqual(newFilter);
    });

    it('should reset filters to default values', () => {
        const newFilter: IssueFilter = {
            category: 'BugFix', 
            priority: 'HIGH'
        };

        service.updateFilter(newFilter);
        service.resetFilters();

        expect(service.getCurrentFilter()).toEqual({
            category: null,
            priority: null 
        });
    });
});