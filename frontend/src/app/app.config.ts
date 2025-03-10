import { ApplicationConfig, ErrorHandler, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { provideHttpClient } from "@angular/common/http";



import { routes } from './app.routes';

import { ErrorHandlerService } from './core/services/error_handler/error-handler.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    provideAnimations(),
    importProvidersFrom([BrowserAnimationsModule]),
    // importProvidersFrom([MarkdownModule]),
    // comment
    importProvidersFrom([MarkdownModule.forRoot()]),
    provideHttpClient(), 
    {
      provide: 'BASE_API_URL',
      useValue: 'http://localhost:8081'
    }
  ]
};
