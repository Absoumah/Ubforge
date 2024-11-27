import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-active-project-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './active-project-badge.component.html',
  styleUrls: ['./active-project-badge.component.scss']
})
export class ActiveProjectBadgeComponent {
  @Input() isActive: boolean = false;
}