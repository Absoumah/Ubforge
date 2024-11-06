import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    // Log the error to the console or send it to an external logging infrastructure
    console.error('An unexpected error occurred:', error);
    // Implement custom logic here
  }
}
