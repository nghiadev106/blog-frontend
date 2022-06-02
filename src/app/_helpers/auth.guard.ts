import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';
import { AuthenticationService } from '../_services/authen.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.authenticationService.isLoggesIn.pipe(take(1), map((loginStatus: boolean) => {
      const destination: string = state.url;
      const surveyId = route.params['surveyId'];
      const questionId = route.params['questionId'];

      // To check if user is not logged in
      if (!loginStatus) {
        this.router.navigate(['/dang-nhap'], { queryParams: { returnUrl: state.url } });
        return false;
      }

      // if the user is already logged in
      switch (destination) {
        case '/dang-bai':
          {
            if (localStorage.getItem("userRole") === "Customer" || localStorage.getItem("userRole") === "Admin" || localStorage.getItem("userRole") === "User") {
              return true;
            } else {
              this.router.navigate(['/dang-nhap'])
              return false;
            }
          }

        default:
          return true;
      }
    }));
  }
}
