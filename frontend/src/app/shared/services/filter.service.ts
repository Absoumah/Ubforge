import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IssueFilter } from '../models/filter.model';

@Injectable({
    providedIn: 'root'
})
export class FilterService {
    private filterSubject = new BehaviorSubject<IssueFilter>({
        category: null,
        priority: null
    });
    currentFilter$ = this.filterSubject.asObservable();

    getCurrentFilter(): IssueFilter {
        return this.filterSubject.value;
    }

    updateFilter(filter: IssueFilter): void {
        this.filterSubject.next(filter);
    }

    resetFilters(): void {
        this.filterSubject.next({
            category: null,
            priority: null
        });
    }
}