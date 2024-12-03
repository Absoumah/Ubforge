import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MenuItem } from '../../models/menu-item.model';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private menuItems: MenuItem[] = [
    { id: '1', title: 'Dashboard', route: '/dashboard' },
    { id: '2', title: 'Projects', route: '/projects' },
    { id: '3', title: 'Issues', route: '/issues' },
    { id: '4', title: 'My Tasks', route: '/tasks/my-tasks' },
    { id: '5', title: 'Board', route: '/tasks/board' },
    { id: '6', title: 'Releases', route: '/releases' },
    { id: '7', title: 'Sprints', route: '/sprints' },
    { id: '8', title: 'Settings', route: '/settings' }


  ];

  private selectedMenuItemSubject = new BehaviorSubject<MenuItem | null>(null);
  selectedMenuItem$ = this.selectedMenuItemSubject.asObservable();

  getMenuItems(): MenuItem[] {
    return this.menuItems;
  }

  setSelectedMenuItem(item: MenuItem): void {
    this.selectedMenuItemSubject.next(item);
  }
}