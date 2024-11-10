import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService implements ErrorHandler {
  handleError(error: any): void {
    // Log the error to the console
    console.error('An unexpected error occurred:', error);

    // Optionally, send error details to an external logging service
    this.logErrorToExternalService(error);

    // Implement custom logic here
  }

  private logErrorToExternalService(error: any): void {
    // Implement logic to send error details to an external logging service
    // Example: HTTP request to a logging endpoint
    // this.http.post('https://logging-service.com/log', { error }).subscribe();
  }
}