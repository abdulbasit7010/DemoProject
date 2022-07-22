"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var animations_1 = require("@angular/platform-browser/animations");
var core_module_1 = require("./core/core.module");
var shared_module_1 = require("./shared/shared.module");
var featured_module_1 = require("./featured/featured.module");
var http_1 = require("@angular/common/http");
var interceptor_1 = require("./core/services/interceptor");
var interceptor_2 = require("./core/services/interceptor");
var interceptor_3 = require("./core/services/interceptor");
var forms_1 = require("@angular/forms");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var cancel_http_req_service_1 = require("./core/services/cancelHttpReq/cancel-http-req.service");
var manageHttp_interceptor_1 = require("./core/services/cancelHttpReq/manageHttp.interceptor");
var ngx_cookie_service_1 = require("ngx-cookie-service");
var ngx_alerts_1 = require("ngx-alerts");
var table_1 = require("@angular/material/table");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var strings_based_charging_component_1 = require("./featured/stats/service-code/strings-based-charging/strings-based-charging.component");
var strings_based_charging_view_component_1 = require("./featured/stats/service-code/strings-based-charging-view/strings-based-charging-view.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                strings_based_charging_component_1.StringsBasedChargingComponent,
                strings_based_charging_view_component_1.StringsBasedChargingViewComponent,
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule,
                //BrowserAnimationsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                http_1.HttpClientModule,
                table_1.MatTableModule,
                core_module_1.CoreModule,
                shared_module_1.SharedModule,
                featured_module_1.FeaturedModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                ngx_alerts_1.AlertModule.forRoot({ timeout: 5000 }),
                animations_1.BrowserAnimationsModule,
            ],
            schemas: [core_1.NO_ERRORS_SCHEMA],
            providers: [
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: interceptor_1.PreRequestService,
                    multi: true
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: interceptor_3.ErrorHandlerService,
                    multi: true
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: interceptor_2.PostRequestService,
                    multi: true
                },
                {
                    provide: http_1.HTTP_INTERCEPTORS,
                    useClass: manageHttp_interceptor_1.ManageHttpInterceptor,
                    multi: true
                },
                ngx_cookie_service_1.CookieService,
                cancel_http_req_service_1.CancelHttpReqService,
            ],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
