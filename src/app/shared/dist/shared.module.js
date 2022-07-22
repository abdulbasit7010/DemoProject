"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SharedModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var material_module_1 = require("@core/modules/material/material.module");
var custom_table_component_1 = require("@shared/components/custom-table/custom-table.component");
var shared_routing_module_1 = require("./shared-routing.module");
var draft_modal_component_1 = require("./draft-modal/draft-modal.component");
var side_main_nav_component_1 = require("./side-main-nav/side-main-nav.component");
var loader_component_1 = require("./loader/loader.component");
var navbar_component_1 = require("./navbar/navbar.component");
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule, material_module_1.MaterialModule, shared_routing_module_1.SharedRoutingModule],
            exports: [
                custom_table_component_1.CustomTableComponent,
                side_main_nav_component_1.SideMainNavComponent,
                loader_component_1.LoaderComponent,
                navbar_component_1.NavbarComponent,
            ],
            entryComponents: [],
            declarations: [
                custom_table_component_1.CustomTableComponent,
                draft_modal_component_1.DraftModalComponent,
                side_main_nav_component_1.SideMainNavComponent,
                loader_component_1.LoaderComponent,
                navbar_component_1.NavbarComponent,
            ]
        })
    ], SharedModule);
    return SharedModule;
}());
exports.SharedModule = SharedModule;
