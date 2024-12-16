import { TestBed } from '@angular/core/testing';
import { ErrorHandlerService } from './error-handler.service';

describe('ErrorHandlerService', () => {
  let service: ErrorHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log error to console when handleError is called', () => {
    const consoleSpy = spyOn(console, 'error');
    const testError = new Error('Test error');
    
    service.handleError(testError);
    
    expect(consoleSpy).toHaveBeenCalledWith('An unexpected error occurred:', testError);
  });

  it('should call logErrorToExternalService when handleError is called', () => {
    const logSpy = spyOn<any>(service, 'logErrorToExternalService');
    const testError = new Error('Test error');
    
    service.handleError(testError);
    
    expect(logSpy).toHaveBeenCalledWith(testError);
  });

  it('should handle different types of errors', () => {
    const consoleSpy = spyOn(console, 'error');
    
    service.handleError('string error');
    service.handleError({ message: 'object error' });
    service.handleError(null);
    
    expect(consoleSpy).toHaveBeenCalledTimes(3);
  });
});
