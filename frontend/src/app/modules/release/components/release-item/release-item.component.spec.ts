import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ReleaseItemComponent } from './release-item.component';
import { ReleaseService } from '../../services/release.service';
import { Release, ReleaseStatus } from '../../models/release';
import { of } from 'rxjs';

describe('ReleaseItemComponent', () => {
  let component: ReleaseItemComponent;
  let fixture: ComponentFixture<ReleaseItemComponent>;

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
    component.release = mockRelease;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});