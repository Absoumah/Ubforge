// sprint-item.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { Sprint } from '../../models/sprint.interface';
import { ProgressBarComponent } from '../../../shared/components/progress-bar/progress-bar.component';
import { SprintService } from '../../services/sprint.service';


@Component({
  selector: 'app-sprint-item',
  standalone: true,
  imports: [CommonModule, DatePipe, ProgressBarComponent],
  templateUrl: './sprint-item.component.html',
  styleUrls: ['./sprint-item.component.scss']
})
export class SprintItemComponent implements OnInit {
  @Input() sprint!: Sprint;
  @Input() set sprintId(id: number) {
    if (id) {
      this.loadSprintById(id);
    }
  }
  @Output() edit = new EventEmitter<number>();
  @Output() delete = new EventEmitter<number>();
  progress: number = 0;
  totalTasks: number = 0;

  constructor(private router: Router, private sprintService: SprintService) { }


  ngOnInit(): void {
    if (this.sprint) {
      this.loadSprintData();
    }
  }

  private loadSprintById(id: number): void {
    this.sprintService.getSprint(id).subscribe(sprint => {
      this.sprint = sprint;
      this.loadSprintData();
    });
  }

  get statusClass(): string {
    return this.sprint.status.toLowerCase();
  }

  private loadProgress(): void {
    this.sprintService.getSprintProgress(this.sprint.id).subscribe(progress => {
      this.progress = progress;
    });
  }

  
  private loadTotalTasks(): void {
    this.sprintService.getTotalTasksForSprint(this.sprint.id).subscribe(total => {
      this.totalTasks = total;
    });
  }

  private loadSprintData(): void {
    this.sprintService.getSprint(this.sprint.id).subscribe(sprint => {
      this.sprint = sprint;
      this.loadProgress();
      this.loadTotalTasks();
    });
  }

  editSprint(event: Event): void {
    event.stopPropagation();
    this.edit.emit(this.sprint.id);
  }

  deleteSprint(event: Event): void {
    event.stopPropagation();
    this.delete.emit(this.sprint.id);
  }

  viewSprint(): void {
    this.router.navigate(['/sprints', this.sprint.id]);
  }
}