import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Sprint } from '../../models/sprint.interface';
import { SprintService } from '../../services/sprint.service';

@Component({
  selector: 'app-sprint-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sprint-selector.component.html',
  styleUrls: ['./sprint-selector.component.scss']
})
export class SprintSelectorComponent implements OnInit {
  @Input() projectId!: number;
  @Input() selectedSprintIds: number[] = [];
  @Output() sprintSelectionChange = new EventEmitter<number[]>();

  projectSprints$!: Observable<Sprint[]>;

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
    this.projectSprints$ = this.sprintService.getSprintsByProject(this.projectId);
  }

  isSelected(sprintId: number): boolean {
    return this.selectedSprintIds.includes(sprintId);
  }

  toggleSprint(sprintId: number): void {
    let newSelection: number[];
    if (this.isSelected(sprintId)) {
      newSelection = this.selectedSprintIds.filter(id => id !== sprintId);
    } else {
      newSelection = [...this.selectedSprintIds, sprintId];
    }
    this.sprintSelectionChange.emit(newSelection);
  }
}