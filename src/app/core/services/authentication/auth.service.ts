import { Injectable } from "@angular/core";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  RouterState,
} from "@angular/router";
import { LocalStorageService } from "@core/services/local-storage/local-storage.service";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService implements CanActivate {
  constructor(
    private localStore: LocalStorageService,
    private router: Router
  ) { }

  exchangeCredentials(data) {
    this.localStore.saveData(environment.TOKEN_KEY, data.access_token);
    this.localStore.saveData(environment.REFRESH_TOKEN_KEY, data.refresh_token);
    this.localStore.saveData(environment.SCOPE_KEY, data.scope);
    this.localStore.saveData(
      environment.EXPIRE_IN_KEY,
      (new Date().getTime() + data.expires_in * 1000).toString()
    );
  }
  unAuthenticated(error) {
    if (error.status === 401) {
      this.logout();
    }
  }
  validateToken() {
    const expire_in: any = this.localStore.getData(environment.EXPIRE_IN_KEY);
    if (
      expire_in.success &&
      new Date(Number(expire_in.data)).getTime() > new Date().getTime()
    ) {
      return true;
    } else {
      return false;
    }
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.validateToken()) {
      if (!(this.localStore.getData(environment.SCOPE_KEY).data.includes("service_services"))) {
        if (state.url === "/service-code-list-view" || state.url === "/sub-service-code-list-view" || state.url === "/service-code-add"
          || state.url === "service-config-add" || state.url === "stringBasedCharging" || state.url === "stringBasedChargingView"
        ) {
          console.log("False Quota Scope");
          this.router.navigateByUrl("/");
          return false;
        }
      }
      if (!(this.localStore.getData(environment.SCOPE_KEY).data.includes("service_menu")))
      {
        if (state.url === "/view-menu" || state.url === "/menu-add" || state.url === "/view-menus-list") {
          console.log("False Quota Scope");
          this.router.navigateByUrl("/");
          return false;
        }
      }
      return true;
    }
    else {
      this.router.navigate(["/"], {
        queryParams: {
          return: state.url,
        },
      });
      return false;
    }
  }

  logout() {
    this.loginPage();

    this.localStore.deleteData(environment.TOKEN_KEY);
    this.localStore.deleteData(environment.REFRESH_TOKEN_KEY);
    this.localStore.deleteData(environment.SCOPE_KEY);
    this.localStore.deleteData(environment.EXPIRE_IN_KEY);
  }

  loginPage() {
    if (this.router.url !== "login") {
      const state: RouterState = this.router.routerState;
      const stateUrl = state.snapshot.url;
      this.router.navigate(["/"]);
    }
  }
}
