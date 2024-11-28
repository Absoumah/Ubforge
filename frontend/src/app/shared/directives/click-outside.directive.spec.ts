import { ElementRef } from '@angular/core';
import { ClickOutsideDirective } from './click-outside.directive';

describe('ClickOutsideDirective', () => {
  it('should create an instance', () => {
    const elementRefMock = { nativeElement: document.createElement('div') };
    const directive = new ClickOutsideDirective(elementRefMock as ElementRef);
    expect(directive).toBeTruthy();
  });
});
