import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { tap, map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getAuthToken().pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        console.log('No autenticado, redirigiendo a /presentacion');
        router.navigate(['/presentacion']);
      }
    }),
    map(isAuthenticated => isAuthenticated) // Retorna el resultado para la protección de la ruta
  );
};
