"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var users_routing_module_1 = require("./users-routing.module");
var login_component_1 = require("./login/login.component");
var material_module_1 = require("@core/modules/material/material.module");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("@app/shared/shared.module");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule = __decorate([
        core_1.NgModule({
            imports: [
                material_module_1.MaterialModule,
                common_1.CommonModule,
                forms_1.FormsModule,
                forms_1.ReactiveFormsModule,
                users_routing_module_1.UsersRoutingModule,
                shared_module_1.SharedModule,
            ],
            declarations: [login_component_1.LoginComponent]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
