import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@core/modules/material/material.module";
import { StatsRoutingModule } from "./stats-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "@shared/shared.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServiceCodeListViewComponent } from "./service-code/service-code-list-view/service-code-list-view.component";
import { ServiceCodeAddComponent } from "./service-code/service-code-add/service-code-add.component";
import { ServiceConfigListComponent } from "./service-config/service-config-list/service-config-list.component";
import { ServiceConfigAddComponent } from "./service-config/service-config-add/service-config-add.component";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { MatTreeModule } from "@angular/material/tree";
import { ViewMenusComponent } from "./menu/view-menus/view-menus.component";
import { MenuMatTreeViewComponent } from "./menu/menu-mat-tree-view/menu-mat-tree-view.component";
import { ConverterPipe } from "./menu/menu-list/converter.pipe";
import { MenuAddComponent } from "./menu/menu-add/menu-add.component";
import { MenuListComponent } from "./menu/menu-list/menu-list.component";
import { SubServiceCodeViewComponent } from "./service-code/sub-service-code-view/sub-service-code-view.component";
import { NgxSliderModule } from "@angular-slider/ngx-slider";

@NgModule({
  imports: [
    CommonModule,
    StatsRoutingModule,
    MaterialModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatTreeModule,
    NgxSliderModule,
  ],
  exports: [],
  entryComponents: [],

  declarations: [
    DashboardComponent,
    ServiceCodeListViewComponent,
    ServiceCodeAddComponent,
    ServiceConfigListComponent,
    ServiceConfigAddComponent,
    ConverterPipe,
    ViewMenusComponent,
    MenuMatTreeViewComponent,
    MenuAddComponent,
    MenuListComponent,
    SubServiceCodeViewComponent,
  ],
})
export class StatsModule {}
