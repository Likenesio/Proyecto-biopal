import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './service/auth-service/auth.service';


@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      const requiredRole = next.data['requiredRole'];
      const userRole = this.authService.obtenerRol();

      if (userRole === requiredRole) {
        return true;
      } else {
        // Redireccionar a una página de acceso denegado u otra ruta adecuada
        this.router.navigate(['/denegate']);
        return false;
      }
    } else {
      // Redireccionar al componente de inicio de sesión o a la página de inicio de sesión
      this.router.navigate(['/login']);
      return false;
    }
  }
}
