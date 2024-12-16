import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarService } from './sidebar.service';
import { MenuItem } from '../../models/menu-item.model';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return menu items', () => {
    const menuItems = service.getMenuItems();
    expect(menuItems.length).toBe(9);
    expect(menuItems[0].title).toBe('Dashboard');
  });

  it('should set and emit selected menu item', (done) => {
    const testMenuItem: MenuItem = { id: '1', title: 'Dashboard', route: '/dashboard' };
    
    service.selectedMenuItem$.subscribe(item => {
      if (item) {
        expect(item).toEqual(testMenuItem);
        done();
      }
    });

    service.setSelectedMenuItem(testMenuItem);
  });

  it('should initially have null selected menu item', (done) => {
    service.selectedMenuItem$.subscribe(item => {
      expect(item).toBeNull();
      done();
    });
  });
});
