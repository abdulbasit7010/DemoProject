"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.NavbarComponent = void 0;
var core_1 = require("@angular/core");
var NavbarComponent = /** @class */ (function () {
    function NavbarComponent(auth, router, allService, alertService) {
        this.auth = auth;
        this.router = router;
        this.allService = allService;
        this.alertService = alertService;
        this.showFiller = true;
        this.units = 0;
    }
    NavbarComponent.prototype.ngOnInit = function () {
        this.getProfileInfo();
    };
    NavbarComponent.prototype.logout = function () {
        localStorage.clear();
        this.auth.logout();
    };
    NavbarComponent.prototype.getProfileInfo = function () {
        var _this = this;
        this.allService.getProfile().subscribe(function (response) {
            if (!response.success) {
                return;
            }
            localStorage.setItem("userEmail", response.data.email);
            _this.userName = response.data.firstname;
            response.data.firstname = response.data.firstname.split("");
            response.data.firstname = response.data.firstname.slice(0, 2);
            response.data.firstname = response.data.firstname.join("");
            _this.nameInitials = response.data.firstname;
            _this.nameInitials = _this.nameInitials.toUpperCase();
        }, function (error) { });
    };
    // getUnitDetails() {
    //   this.allService.getUnitDetails().subscribe((res) => {
    //     if (!res.success) {
    //       this.alertService.danger("Cannot fetch Unit Details");
    //       return;
    //     }
    //     this.units = res.data[0].available_units;
    //   });
    // }
    NavbarComponent.prototype.profileSettings = function () {
        this.router.navigateByUrl("userProfile");
    };
    NavbarComponent = __decorate([
        core_1.Component({
            selector: "app-navbar",
            templateUrl: "./navbar.component.html",
            styleUrls: ["./navbar.component.scss"]
        })
    ], NavbarComponent);
    return NavbarComponent;
}());
exports.NavbarComponent = NavbarComponent;
