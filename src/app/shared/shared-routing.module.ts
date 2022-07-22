import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ServiceCodeAddComponent } from "@app/featured/stats/service-code/service-code-add/service-code-add.component";
import { SideMainNavComponent } from "./side-main-nav/side-main-nav.component";
const routes: Routes = [
  {
    path: "service",
    component: SideMainNavComponent,

    // canActivate: [AuthService],
  },

  {
    path: "service-code-add",
    component: ServiceCodeAddComponent,

    // canActivate: [AuthService],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
