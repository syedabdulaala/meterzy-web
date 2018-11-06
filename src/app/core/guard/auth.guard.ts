import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Helper } from 'src/app/shared/helper';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!Helper.isLoggedIn()) {
      this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
    }
    return true;
  }
}
