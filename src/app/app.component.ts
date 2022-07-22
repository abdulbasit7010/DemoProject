import { Component, ElementRef } from "@angular/core";
import { AuthService } from "@core/services/authentication/auth.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "verifApp";
  constructor(private auth: AuthService) {}

  logout() {
    this.auth.logout();
    this.auth.loginPage();
  }
}
