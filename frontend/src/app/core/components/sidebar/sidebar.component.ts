import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { SidebarService } from '../../../core/services/sidebar/sidebar.service';
import { MenuItem } from '../../../core/models/menu-item.model';
import { ProjectSwitcherComponent } from '../../../modules/project/components/project-switcher/project-switcher.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, ProjectSwitcherComponent],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  menuItems: MenuItem[] = [];
  selectedItem: MenuItem | null = null;
  private subscription: Subscription = new Subscription();

  constructor(private sidebarService: SidebarService) { }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.getMenuItems();
    this.subscription.add(
      this.sidebarService.selectedMenuItem$.subscribe(
        item => this.selectedItem = item
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSelectMenuItem(item: MenuItem): void {
    this.sidebarService.setSelectedMenuItem(item);
  }

  isSelected(item: MenuItem): boolean {
    return this.selectedItem?.id === item.id;
  }
}