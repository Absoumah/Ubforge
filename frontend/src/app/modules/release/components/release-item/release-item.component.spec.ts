import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { ReleaseItemComponent } from './release-item.component';
import { ReleaseService } from '../../services/release.service';
import { Release, ReleaseStatus } from '../../models/release';
import { of } from 'rxjs';

describe('ReleaseItemComponent', () => {
  let component: ReleaseItemComponent;
  let fixture: ComponentFixture<ReleaseItemComponent>;
  let router: Router;

  const mockRelease: Release = {
    id: 1,
    version: '1.0.0',
    name: 'Test Release',
    description: 'Test Description',
    releaseDate: '2024-03-20',
    status: ReleaseStatus.PLANNED,
    projectId: 1,
    sprintIds: []
  };

  const mockReleaseService = {
    calculateReleaseProgress: jasmine.createSpy('calculateReleaseProgress').and.returnValue(of(50))
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReleaseItemComponent
      ],
      providers: [
        provideRouter([]),
        { provide: ReleaseService, useValue: mockReleaseService }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ReleaseItemComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    component.release = mockRelease;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate progress on init if not provided', () => {
    expect(mockReleaseService.calculateReleaseProgress).toHaveBeenCalledWith(mockRelease.id);
  });

  it('should emit edit event with release id', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');
    spyOn(component.edit, 'emit');
    
    component.onEdit(event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.edit.emit).toHaveBeenCalledWith(mockRelease.id);
  });

  it('should emit delete event with release id', () => {
    const event = new Event('click');
    spyOn(event, 'stopPropagation');
    spyOn(component.delete, 'emit');
    
    component.onDelete(event);
    
    expect(event.stopPropagation).toHaveBeenCalled();
    expect(component.delete.emit).toHaveBeenCalledWith(mockRelease.id);
  });

  it('should navigate to release details on click', () => {
    spyOn(router, 'navigate');
    
    component.onReleaseClick();
    
    expect(router.navigate).toHaveBeenCalledWith(['/releases', mockRelease.id]);
  });

  describe('getProgressColor', () => {
    it('should return primary when no progress exists', () => {
      component.release.progress = undefined;
      expect(component.getProgressColor()).toBe('primary');
    });

    it('should return success for 100% progress', () => {
      component.release.progress = { totalSprints: 2, completedSprints: 2, percentage: 100 };
      expect(component.getProgressColor()).toBe('success');
    });

    it('should return info for progress >= 70%', () => {
      component.release.progress = { totalSprints: 2, completedSprints: 1, percentage: 75 };
      expect(component.getProgressColor()).toBe('info');
    });

    it('should return warning for progress >= 30%', () => {
      component.release.progress = { totalSprints: 2, completedSprints: 1, percentage: 35 };
      expect(component.getProgressColor()).toBe('warning');
    });

    it('should return danger for progress < 30%', () => {
      component.release.progress = { totalSprints: 2, completedSprints: 0, percentage: 20 };
      expect(component.getProgressColor()).toBe('danger');
    });
  });
});