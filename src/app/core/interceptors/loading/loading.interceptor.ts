import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const spinner = inject(NgxSpinnerService);

  // Show the spinner before the request starts
  spinner.show();

  return next(req).pipe(
    finalize(() => {
      // Hide the spinner when the request completes
      spinner.hide();
    })
  );
};
