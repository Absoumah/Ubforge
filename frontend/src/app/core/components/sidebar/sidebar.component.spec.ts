import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { SidebarComponent } from './sidebar.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SidebarService } from '../../services/sidebar/sidebar.service';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let router: Router;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});