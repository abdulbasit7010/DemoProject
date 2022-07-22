import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "@app/core/services/authentication/auth.service";
import { AllService } from "@app/core/services/stats-service/all.service";
import { AlertService } from "ngx-alerts";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  showFiller = true;
  units = 0;
  nameInitials: string;
  userName;
  constructor(
    private auth: AuthService,
    private router: Router,
    private allService: AllService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.getProfileInfo();
  }
  logout() {
    localStorage.clear();

    this.auth.logout();
  }

  getProfileInfo() {
    this.allService.getProfile().subscribe(
      (response) => {
        if (!response.success) {
          return;
        }
        localStorage.setItem("userEmail", response.data.email);
        this.userName = response.data.firstname;
        response.data.firstname = response.data.firstname.split("");
        response.data.firstname = response.data.firstname.slice(0, 2);
        response.data.firstname = response.data.firstname.join("");
        this.nameInitials = response.data.firstname;
        this.nameInitials = this.nameInitials.toUpperCase();
      },
      (error) => {}
    );
  }

  // getUnitDetails() {
  //   this.allService.getUnitDetails().subscribe((res) => {
  //     if (!res.success) {
  //       this.alertService.danger("Cannot fetch Unit Details");
  //       return;
  //     }

  //     this.units = res.data[0].available_units;
  //   });
  // }
  profileSettings() {
    this.router.navigateByUrl("userProfile");
  }
}
