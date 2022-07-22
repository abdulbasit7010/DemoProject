"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FeaturedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var users_module_1 = require("@featured/users/users.module");
var stats_module_1 = require("@featured/stats/stats.module");
var forms_1 = require("@angular/forms");
var FeaturedModule = /** @class */ (function () {
    function FeaturedModule() {
    }
    FeaturedModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                users_module_1.UsersModule,
                stats_module_1.StatsModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
            ],
            exports: [users_module_1.UsersModule, stats_module_1.StatsModule],
            declarations: []
        })
    ], FeaturedModule);
    return FeaturedModule;
}());
exports.FeaturedModule = FeaturedModule;
