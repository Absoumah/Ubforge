import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { IssueCategory } from '../../../modules/issue/models/issue';
import { PriorityFilterComponent } from '../priority-filter/priority-filter.component';

@Component({
  selector: 'app-issue-filter',
  templateUrl: './issue-filter.component.html',
  styleUrls: ['./issue-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, PriorityFilterComponent]
})
export class IssueFilterComponent implements OnInit {
  categories: IssueCategory[] = ['BugFix', 'Feature', 'Enhancement', 'Documentation'];
  selectedCategory: string | null = null;

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.currentFilter$.subscribe(filter => {
      this.selectedCategory = filter.category;
    });
  }

  onCategoryChange(category: string | null): void {
    this.filterService.updateFilter({
      ...this.filterService.getCurrentFilter(),
      category
    });
  }

  resetFilter(): void {
    this.filterService.resetFilters();
  }
}