import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlimSidebarComponent } from './slim-sidebar.component';

describe('SlimSidebarComponent', () => {
  let component: SlimSidebarComponent;
  let fixture: ComponentFixture<SlimSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlimSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlimSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have search button that calls onSearch', () => {
    const searchSpy = spyOn(component, 'onSearch');
    const searchButton = fixture.debugElement.nativeElement.querySelector('button:nth-child(2)');
    searchButton.click();
    expect(searchSpy).toHaveBeenCalled();
  });

  it('should have create button that calls onCreate', () => {
    const createSpy = spyOn(component, 'onCreate');
    const createButton = fixture.debugElement.nativeElement.querySelector('button:nth-child(3)');
    createButton.click();
    expect(createSpy).toHaveBeenCalled();
  });

  it('should have help button that calls onHelp', () => {
    const helpSpy = spyOn(component, 'onHelp');
    const helpButton = fixture.debugElement.nativeElement.querySelector('.bottom-section button:last-child');
    helpButton.click();
    expect(helpSpy).toHaveBeenCalled();
  });

  it('should render all required buttons', () => {
    const buttons = fixture.debugElement.nativeElement.querySelectorAll('button');
    expect(buttons.length).toBe(5);
    
    const icons = fixture.debugElement.nativeElement.querySelectorAll('.material-icons');
    expect(icons.length).toBe(5);
    expect(icons[0].textContent).toBe('home');
    expect(icons[1].textContent).toBe('search');
    expect(icons[2].textContent).toBe('add');
    expect(icons[3].textContent).toBe('account_circle');
    expect(icons[4].textContent).toBe('help');
  });
});
