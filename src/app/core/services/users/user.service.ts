import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { HttpService } from "@core/services/http/http.service";
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  public user$;

  constructor(private httpService: HttpService) {}

  /**
   * @Login
   * @param email, password
   */
  login = (user) => {
    const body = new URLSearchParams();
    console.log("User G", user.username)
    body.set("username", user.username);
    body.set("password", user.password);
    body.set("grant_type", "password");
    body.set("scope", "service service-user service_services service_menu");
    this.user$ = new Observable();
    this.user$ = this.httpService.postRequest(
      environment.apiRoutes.loginUser,
      body.toString()
    );
  };
}
