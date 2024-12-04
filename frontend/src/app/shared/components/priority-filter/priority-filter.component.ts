import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { IssuePriority } from "../../../modules/issue/models/issue-priority.enum";
import { FilterService } from "../../services/filter.service";

@Component({
  selector: 'app-priority-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './priority-filter.component.html',
  styleUrls: ['./priority-filter.component.scss']
})
export class PriorityFilterComponent {
  priorities = Object.values(IssuePriority);
  selectedPriority: string | null = null;

  constructor(private filterService: FilterService) {
    this.filterService.currentFilter$.subscribe(filter => {
      this.selectedPriority = filter.priority;
    });
  }

  onPriorityChange(priority: string | null): void {
    this.filterService.updateFilter({
      ...this.filterService.getCurrentFilter(),
      priority
    });
  }
}