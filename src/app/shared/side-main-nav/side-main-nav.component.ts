import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { AuthService } from "@app/core/services/authentication/auth.service";
import { LocalStorageService } from "@app/core/services/local-storage";
import { environment } from "@env/environment";

@Component({
  selector: "app-side-main-nav",
  templateUrl: "./side-main-nav.component.html",
  styleUrls: ["./side-main-nav.component.css"],
})
export class SideMainNavComponent implements OnInit {
  @Input() addEditServicesChecker: boolean;
  @Input() addEditServiceConfigChecker: boolean;
  addEditServiceConfig = "Add Esme Configuration";
  addEditServices = "Add Service";

  showSubService = false;
  isServiceEnabled = false;
  isMenuEnabled = false;
  showService = false;
  showMenu = false;
  showConfig = false;
  componentName = "dashboard";
  constructor(private router: ActivatedRoute, private auth: AuthService, private localStore: LocalStorageService) {}

  ngOnInit(): void {
    if (this.addEditServicesChecker) {
      this.addEditServices = "Edit Service";
    }

    if (this.addEditServiceConfigChecker) {
      this.addEditServiceConfig = "Edit ESME Configuration";
    }

    this.showService = this.isServiceEnabled = this.localStore.getData(environment.SCOPE_KEY).data.includes("service_services")
    this.showMenu = this.isMenuEnabled = this.localStore.getData(environment.SCOPE_KEY).data.includes("service_menu")

    if (JSON.parse(localStorage.getItem("showService"))) {
      this.showService = JSON.parse(localStorage.getItem("showService"));
      console.log("this.showService", this.showService);
    }

    if (JSON.parse(localStorage.getItem("showMenu"))) {
      this.showMenu = JSON.parse(localStorage.getItem("showMenu"));
      console.log("this.showMenu", this.showMenu);
    }

    if (JSON.parse(localStorage.getItem("showConfig"))) {
      this.showConfig = JSON.parse(localStorage.getItem("showConfig"));
      console.log("this.showList", this.showConfig);
    }
  }

  openClosePanel(data: string) {
    if (data == "showService") {
      this.showService = !this.showService;
      if (this.showService == true) {
        this.showMenu = false;
        this.showConfig = false;
      }
      localStorage.setItem("showService", this.showService.toString());
      localStorage.setItem("showMenu", this.showMenu.toString());
      localStorage.setItem("showConfig", this.showConfig.toString());
    }
    if (data == "showMenu") {
      this.showMenu = !this.showMenu;
      if (this.showMenu == true) {
        this.showService = false;
        this.showConfig = false;
      }
      localStorage.setItem("showService", this.showService.toString());
      localStorage.setItem("showMenu", this.showMenu.toString());
      localStorage.setItem("showConfig", this.showConfig.toString());
    }
    if (data == "showConfig") {
      this.showConfig = !this.showConfig;
      if (this.showConfig == true) {
        this.showService = false;
        this.showMenu = false;
      }
      localStorage.setItem("showService", this.showService.toString());
      localStorage.setItem("showMenu", this.showMenu.toString());
      localStorage.setItem("showConfig", this.showConfig.toString());
    }
  }

  isSelected(e) {
    console.log("ee", e);
    this.componentName = e;
  }
  logout() {
    localStorage.clear();

    this.auth.logout();
  }
}
