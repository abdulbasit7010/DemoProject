import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { ServiceCodeListViewComponent } from "./service-code/service-code-list-view/service-code-list-view.component";
import { ServiceCodeAddComponent } from "./service-code/service-code-add/service-code-add.component";
import { ServiceConfigAddComponent } from "./service-config/service-config-add/service-config-add.component";
import { ServiceConfigListComponent } from "./service-config/service-config-list/service-config-list.component";
import { ViewMenusComponent } from "./menu/view-menus/view-menus.component";
import { AuthService } from "@app/core/services/authentication/auth.service";
import { MenuMatTreeViewComponent } from "./menu/menu-mat-tree-view/menu-mat-tree-view.component";
import { MenuListComponent } from "./menu/menu-list/menu-list.component";
import { SubServiceCodeViewComponent } from "./service-code/sub-service-code-view/sub-service-code-view.component";
import { StringsBasedChargingComponent } from "./service-code/strings-based-charging/strings-based-charging.component";
import { StringsBasedChargingViewComponent } from "./service-code/strings-based-charging-view/strings-based-charging-view.component";
const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,

    canActivate: [AuthService],
  },
  {
    path: "service-code-list-view",
    component: ServiceCodeListViewComponent,

    canActivate: [AuthService],
  },
  {
    path: "sub-service-code-list-view",
    component: SubServiceCodeViewComponent,

    canActivate: [AuthService],
  },
  {
    path: "service-code-add",
    component: ServiceCodeAddComponent,

    canActivate: [AuthService],
  },
  {
    path: "view-menu",
    component: MenuListComponent,
    canActivate: [AuthService],
  },
  {
    path: "menu-add",
    //component: MenuAddComponent,
    component: MenuMatTreeViewComponent,
    canActivate: [AuthService],
  },
  {
    path: "view-menus-list",
    component: ViewMenusComponent,

    canActivate: [AuthService],
  },
  {
    path: "service-config-add",
    component: ServiceConfigAddComponent,

    canActivate: [AuthService],
  },
  {
    path: "service-config-list",
    component: ServiceConfigListComponent,

    canActivate: [AuthService],
  },

  {
    path: "menuMatTreeView",
    component: MenuMatTreeViewComponent,

    canActivate: [AuthService],
  },
  {
    path: "stringBasedCharging",
    component: StringsBasedChargingComponent,

    canActivate: [AuthService],
  },
  {
    path: "stringBasedChargingView",
    component: StringsBasedChargingViewComponent,

    canActivate: [AuthService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatsRoutingModule {}
