import {Injectable} from '@angular/core';
import {ActivatedRoute, Router, NavigationExtras} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  constructor(private router: Router, private route: ActivatedRoute) {
  }

  landingPage() {
  }

  loginPage() {
    if (this.router.url !== 'login') {
      this.router.navigate(['/login']);
    }
  }
  redirectPage(path) {
    this.router.navigate([path]);
  }
  appendQueryParams(param) {
    const queryParams = {};
    this.route.queryParams.subscribe(params => {
      for (const key in params) {
        if (key) {
          queryParams[key] = params[key]; // Copies each property to the objCopy object
        }
      }
    });
    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: Object.assign(queryParams, param)
    };
    const currentRoute = window.location.pathname;
    this.router.navigate([currentRoute], navigationExtras);
  }
  getQueryParams () {
    return this.route.queryParams;
  }
}
