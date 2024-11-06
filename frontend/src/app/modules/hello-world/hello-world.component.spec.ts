// hello-world.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HelloWorldComponent } from './hello-world.component';

describe('HelloWorldComponent', () => {
  let component: HelloWorldComponent;
  let fixture: ComponentFixture<HelloWorldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelloWorldComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HelloWorldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the HelloWorld component', () => {
    expect(component).toBeTruthy();
  });

  it('should render "Hello, World!" in an h1 tag', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, World!');
  });

  it('should display an alert when the button is clicked', () => {
    spyOn(window, 'alert');
    const button = fixture.nativeElement.querySelector('.cta-button');
    button.click();
    expect(window.alert).toHaveBeenCalledWith("Let's get started!");
  });
});
