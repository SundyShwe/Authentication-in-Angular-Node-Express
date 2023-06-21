import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const addTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const clone = req.clone({
    headers: req.headers.set('Authorization', 'Bearer ' + authService.state().jwt)
  })
  return next(clone);
};
