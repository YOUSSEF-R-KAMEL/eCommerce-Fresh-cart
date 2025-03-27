import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HelperService } from '../../../shared/services/helpers/helper.service';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('Interceptor running:', req.url); // 🔍 Debugging log

  const helperService = inject(HelperService);
  const baseUrl = 'https://ecommerce.routemisr.com/api/v1/';
  const isBrowser = helperService.isPlatformBrowser();

  let token: string | null = isBrowser ? localStorage.getItem('token') : null;

  const newRequest = req.clone({
    url: req.url.includes('assets') ? req.url : baseUrl + req.url,
    setHeaders: {
      Authorization: token ? token : '',
    },
  });
  return next(newRequest);
};

