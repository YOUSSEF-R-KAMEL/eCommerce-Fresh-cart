import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  if (typeof localStorage !== 'undefined') {
    const token = localStorage.getItem('token')!;
    if (token) {
      router.navigate(['/home']);
      return false;
    } else {
      return true;
    }
  }
  return false
};
