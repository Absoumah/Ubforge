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
    { id: '3', title: 'Settings', route: '/settings' }
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