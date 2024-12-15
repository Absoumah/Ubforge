import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter, NavigationEnd } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarService } from '../../services/sidebar/sidebar.service';
import { MenuItem } from '../../models/menu-item.model';
import { of } from 'rxjs';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;
  let sidebarService: SidebarService;

  const mockMenuItems: MenuItem[] = [
    { id: '1', title: 'Dashboard', route: '/dashboard' },
    { id: '2', title: 'Projects', route: '/projects' }
  ];

  const routeConfig = [
    { path: 'dashboard', component: {} as any },
    { path: 'projects', component: {} as any },
    { path: 'issues', component: {} as any }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidebarComponent, HttpClientTestingModule],
      providers: [
        provideRouter(routeConfig),
        SidebarService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    sidebarService = TestBed.inject(SidebarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize menu items on ngOnInit', () => {
    spyOn(sidebarService, 'getMenuItems').and.returnValue(mockMenuItems);
    component.ngOnInit();
    expect(component.menuItems).toEqual(mockMenuItems);
  });

  it('should update selectedItem when service emits new value', () => {
    const testItem = mockMenuItems[0];
    spyOn(sidebarService.selectedMenuItem$, 'subscribe');
    component.ngOnInit();
    expect(sidebarService.selectedMenuItem$.subscribe).toHaveBeenCalled();
  });

  it('should update isProjectsRoute on navigation', () => {
    const navigationEnd = new NavigationEnd(1, '/projects', '/projects');
    spyOn(router.events, 'pipe').and.returnValue(of(navigationEnd));
    component.ngOnInit();
    expect(component.isProjectsRoute).toBeTrue();
  });

  it('should call setSelectedMenuItem when onSelectMenuItem is called', () => {
    spyOn(sidebarService, 'setSelectedMenuItem');
    const testItem = mockMenuItems[0];
    component.onSelectMenuItem(testItem);
    expect(sidebarService.setSelectedMenuItem).toHaveBeenCalledWith(testItem);
  });

  it('should correctly determine if item is selected', () => {
    const testItem = mockMenuItems[0];
    component.selectedItem = testItem;
    expect(component.isSelected(testItem)).toBeTrue();
    expect(component.isSelected(mockMenuItems[1])).toBeFalse();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component['subscription'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['subscription'].unsubscribe).toHaveBeenCalled();
  });
});