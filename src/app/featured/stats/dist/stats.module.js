"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StatsModule = void 0;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var material_module_1 = require("@core/modules/material/material.module");
var stats_routing_module_1 = require("./stats-routing.module");
var forms_1 = require("@angular/forms");
var shared_module_1 = require("@shared/shared.module");
var dashboard_component_1 = require("./dashboard/dashboard.component");
var service_code_list_view_component_1 = require("./service-code/service-code-list-view/service-code-list-view.component");
var service_code_add_component_1 = require("./service-code/service-code-add/service-code-add.component");
var service_config_list_component_1 = require("./service-config/service-config-list/service-config-list.component");
var service_config_add_component_1 = require("./service-config/service-config-add/service-config-add.component");
var ng_multiselect_dropdown_1 = require("ng-multiselect-dropdown");
var tree_1 = require("@angular/material/tree");
var view_menus_component_1 = require("./menu/view-menus/view-menus.component");
var menu_mat_tree_view_component_1 = require("./menu/menu-mat-tree-view/menu-mat-tree-view.component");
var converter_pipe_1 = require("./menu/menu-list/converter.pipe");
var menu_add_component_1 = require("./menu/menu-add/menu-add.component");
var menu_list_component_1 = require("./menu/menu-list/menu-list.component");
var sub_service_code_view_component_1 = require("./service-code/sub-service-code-view/sub-service-code-view.component");
var ngx_slider_1 = require("@angular-slider/ngx-slider");
var StatsModule = /** @class */ (function () {
    function StatsModule() {
    }
    StatsModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                stats_routing_module_1.StatsRoutingModule,
                material_module_1.MaterialModule,
                forms_1.FormsModule,
                shared_module_1.SharedModule,
                forms_1.ReactiveFormsModule,
                ng_multiselect_dropdown_1.NgMultiSelectDropDownModule.forRoot(),
                tree_1.MatTreeModule,
                ngx_slider_1.NgxSliderModule,
            ],
            exports: [],
            entryComponents: [],
            declarations: [
                dashboard_component_1.DashboardComponent,
                service_code_list_view_component_1.ServiceCodeListViewComponent,
                service_code_add_component_1.ServiceCodeAddComponent,
                service_config_list_component_1.ServiceConfigListComponent,
                service_config_add_component_1.ServiceConfigAddComponent,
                converter_pipe_1.ConverterPipe,
                view_menus_component_1.ViewMenusComponent,
                menu_mat_tree_view_component_1.MenuMatTreeViewComponent,
                menu_add_component_1.MenuAddComponent,
                menu_list_component_1.MenuListComponent,
                sub_service_code_view_component_1.SubServiceCodeViewComponent,
            ]
        })
    ], StatsModule);
    return StatsModule;
}());
exports.StatsModule = StatsModule;
