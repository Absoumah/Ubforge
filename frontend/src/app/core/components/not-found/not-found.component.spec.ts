import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundComponent } from './not-found.component';
import { By } from '@angular/platform-browser';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundComponent],
      providers: [
        provideRouter([
          { path: '**', component: NotFoundComponent }
        ])
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display 404 heading', () => {
    const h1 = fixture.debugElement.query(By.css('h1'));
    expect(h1.nativeElement.textContent).toContain('404 - Page Not Found');
  });

  it('should display error message', () => {
    const p = fixture.debugElement.query(By.css('p'));
    expect(p.nativeElement.textContent).toContain('The page you are looking for does not exist');
  });

  it('should have link to home page', () => {
    const a = fixture.debugElement.query(By.css('a'));
    expect(a.nativeElement.textContent).toContain('Go to Home');
    expect(a.attributes['routerLink']).toBe('/');
  });

  it('should have correct CSS classes', () => {
    const container = fixture.debugElement.query(By.css('.not-found-container'));
    expect(container).toBeTruthy();
  });
});