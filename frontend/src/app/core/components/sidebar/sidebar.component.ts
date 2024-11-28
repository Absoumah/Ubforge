import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription, filter } from 'rxjs';
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
  isProjectsRoute: boolean = false;
  private subscription: Subscription = new Subscription();

  constructor(
    private sidebarService: SidebarService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.menuItems = this.sidebarService.getMenuItems();

    this.subscription.add(
      this.sidebarService.selectedMenuItem$.subscribe(
        item => this.selectedItem = item
      )
    );

    this.subscription.add(
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
      ).subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.isProjectsRoute = event.url.includes('/projects');
        }
      })
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