import { ApplicationConfig } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideClientHydration } from '@angular/platform-browser';

import { routes } from './app.routes';
import { HelperService } from './shared/services/helpers/helper.service';
import { globalInterceptor } from './core/interceptors/global/global.interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions()),
    provideHttpClient(withInterceptors([globalInterceptor, loadingInterceptor])),
    provideClientHydration(),
    provideAnimations(),
    HelperService,
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      progressBar: true,
    })
  ],
};
