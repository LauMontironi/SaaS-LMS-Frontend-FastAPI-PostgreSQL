import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { routes } from './app.routes';

// PrimeNG
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { MessageService } from 'primeng/api';

import { authInterceptor } from './interceptors/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withComponentInputBinding()),
    provideHttpClient(withInterceptors([authInterceptor])),
    MessageService,
    providePrimeNG({
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: 'none'
    }
  }
})
  
  ]
};