// src/app/components/issue-filter/issue-filter.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterService } from '../../services/filter.service';
import { IssueCategory } from '../../../modules/issue/models/issue';

@Component({
  selector: 'app-issue-filter',
  templateUrl: './issue-filter.component.html',
  styleUrls: ['./issue-filter.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class IssueFilterComponent implements OnInit {
  categories: IssueCategory[] = ['BugFix', 'Feature', 'Enhancement', 'Documentation']; selectedCategory: string | null = null;

  constructor(private filterService: FilterService) { }

  ngOnInit(): void {
    this.filterService.currentFilter$.subscribe(filter => {
      this.selectedCategory = filter.category;
    });
  }

  onCategoryChange(category: string | null): void {
    this.filterService.updateFilter({ category });
  }

  resetFilter(): void {
    this.filterService.resetFilters();
  }
}