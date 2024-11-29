import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SprintItemComponent } from '../sprint-item/sprint-item.component';
import { SprintService } from '../../services/sprint.service';
import { Sprint } from '../../models/sprint.interface';

@Component({
  selector: 'app-sprint-list',
  standalone: true,
  imports: [CommonModule, SprintItemComponent],
  templateUrl: './sprint-list.component.html',
  styleUrls: ['./sprint-list.component.scss']
})
export class SprintListComponent implements OnInit {
  sprints: Sprint[] = [];

  constructor(private sprintService: SprintService) { }

  ngOnInit(): void {
    this.loadSprints();
  }

  private loadSprints(): void {
  }
}