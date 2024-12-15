import { ElementRef } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  let directive: ClickOutsideDirective;
  let elementRefMock: ElementRef;

  beforeEach(() => {
    elementRefMock = { nativeElement: document.createElement('div') } as ElementRef;
    directive = new ClickOutsideDirective(elementRefMock);
  });

  it('should create an instance', () => {
    expect(directive).toBeTruthy();
  });

  it('should emit when clicking outside element', () => {
    const outsideElement = document.createElement('button');
    spyOn(directive.clickOutside, 'emit');
    
    directive.onClick(outsideElement);

    expect(directive.clickOutside.emit).toHaveBeenCalled();
  });

  it('should not emit when clicking inside element', () => {
    const insideElement = document.createElement('button');
    elementRefMock.nativeElement.appendChild(insideElement);
    spyOn(directive.clickOutside, 'emit');
    
    directive.onClick(insideElement);

    expect(directive.clickOutside.emit).not.toHaveBeenCalled();
  });
});
