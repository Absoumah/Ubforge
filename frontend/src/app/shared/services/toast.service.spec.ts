import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { Toast } from '../models/toast.model';

describe('ToastService', () => {
  let service: ToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initially have no toasts', (done) => {
    service.getToasts().subscribe(toasts => {
      expect(toasts).toEqual([]);
      done();
    });
  });

  it('should add a new toast with default values', () => {
    const message = 'Test message';
    service.show(message);

    service.getToasts().subscribe(toasts => {
      expect(toasts.length).toBe(1);
      expect(toasts[0].message).toBe(message);
      expect(toasts[0].type).toBe('info');
      expect(toasts[0].duration).toBe(3000);
    });
  });

  it('should add a toast with custom type and duration', () => {
    const message = 'Test message';
    service.show(message, 'success', 5000);

    service.getToasts().subscribe(toasts => {
      expect(toasts.length).toBe(1);
      expect(toasts[0].message).toBe(message);
      expect(toasts[0].type).toBe('success');
      expect(toasts[0].duration).toBe(5000);
    });
  });

  it('should add success toast', () => {
    service.success('Success message');

    service.getToasts().subscribe(toasts => {
      expect(toasts.length).toBe(1);
      expect(toasts[0].type).toBe('success');
      expect(toasts[0].message).toBe('Success message');
    });
  });

  it('should add error toast', () => {
    service.error('Error message');

    service.getToasts().subscribe(toasts => {
      expect(toasts.length).toBe(1);
      expect(toasts[0].type).toBe('error');
      expect(toasts[0].message).toBe('Error message');
    });
  });

  it('should add info toast', () => {
    service.info('Info message');

    service.getToasts().subscribe(toasts => {
      expect(toasts.length).toBe(1);
      expect(toasts[0].type).toBe('info');
      expect(toasts[0].message).toBe('Info message');
    });
  });

  it('should add warning toast', () => {
    service.warning('Warning message');

    service.getToasts().subscribe(toasts => {
      expect(toasts.length).toBe(1);
      expect(toasts[0].type).toBe('warning');
      expect(toasts[0].message).toBe('Warning message');
    });
  });

  it('should increment toast ids', () => {
    service.show('Message 1');
    service.show('Message 2');

    service.getToasts().subscribe(toasts => {
      expect(toasts[0].id).toBe(0);
      expect(toasts[1].id).toBe(1);
    });
  });
});
