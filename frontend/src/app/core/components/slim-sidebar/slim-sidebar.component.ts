import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slim-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './slim-sidebar.component.html',
  styleUrl: './slim-sidebar.component.scss'
})
export class SlimSidebarComponent {
  onSearch(): void {
    // TODO: Implement search
  }

  onCreate(): void {
    // TODO: Implement create
  }

  onHelp(): void {
    // TODO : Implement help
  }

}
