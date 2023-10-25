import { OidcSecurityService } from 'angular-auth-oidc-client';
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take } from 'rxjs';

export const authGuard = () => {
  const router = inject(Router);

  const oidcSecurityService = inject(OidcSecurityService);

  return oidcSecurityService.isAuthenticated$.pipe(
    take(1),
    map(({ isAuthenticated }) => {
      if (!isAuthenticated) {
        alert('You are not authorized to access this page!!')
        oidcSecurityService.authorize();
        return false;
      }
      return true;
    })
  );
};
