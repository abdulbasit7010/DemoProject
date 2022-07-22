"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PreRequestService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var operators_1 = require("rxjs/operators");
var PreRequestService = /** @class */ (function () {
    function PreRequestService(authService, localStore, loaderService) {
        this.authService = authService;
        this.localStore = localStore;
        this.loaderService = loaderService;
        this.secretToken = "";
    }
    // function which will be called for all http calls
    PreRequestService.prototype.intercept = function (request, next) {
        var _this = this;
        this.loaderService.show();
        if (request.url.endsWith("/token") && request.method === "POST") {
            request = request.clone({
                headers: request.headers.set("Authorization", "Basic " + environment_1.environment.CONSUMER_KEY_SECRET)
            });
            request = request.clone({
                headers: request.headers.set("Content-Type", "application/x-www-form-urlencoded")
            });
            // request = request.clone({
            //   headers: request.headers.set("Set-Cookie",`SameSite=None;Secure`)
            // });
            request = request.clone({
                url: request.url.replace("http://", "https://")
            });
        }
        else {
            this.secretToken = this.getToken();
            request = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + this.secretToken)
            });
            //   request = request.clone({
            //     headers: request.headers.set(
            //       "Cache-Control",
            //       "no-cache, no-store, must-revalidate, post- check=0, pre-check=0"
            //     ),
            //   });
            //   request = request.clone({
            //     headers: request.headers.set("Pragma", "no-cache"),
            //   });
            //   request = request.clone({
            //     headers: request.headers.set("Expires", "0"),
            //   });
        }
        if (request.url.toString().includes("zong/1")) {
            request = request.clone({
                headers: request.headers.set("SOAPAction", ""),
                responseType: "text"
            });
        }
        if (request.url.toString().includes("download-")) {
            request = request.clone({
                responseType: "blob"
            });
        }
        return next.handle(request).pipe(operators_1.finalize(function () { return _this.loaderService.hide(); }));
    };
    PreRequestService.prototype.getToken = function () {
        var token = this.localStore.getData(environment_1.environment.TOKEN_KEY);
        var tokenExpiryTime = this.localStore.getData(environment_1.environment.EXPIRE_IN_KEY);
        console.log("Token Expiry:", tokenExpiryTime);
        if (tokenExpiryTime.success &&
            new Date(Number(tokenExpiryTime.data)).getTime() > new Date().getTime()) {
            return token && token.success ? token.data : null;
        }
        else {
            this.authService.logout();
        }
    };
    PreRequestService = __decorate([
        core_1.Injectable({
            providedIn: "root"
        })
    ], PreRequestService);
    return PreRequestService;
}());
exports.PreRequestService = PreRequestService;
