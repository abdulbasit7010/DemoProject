import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "@featured/users/login/login.component";
import { DashboardComponent } from "@featured/stats/dashboard/dashboard.component";

import { AuthService } from "./core/services/authentication/auth.service";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent,
  },
  {
    path: "service",
    loadChildren: () =>
      import("./featured/users/users.module").then((mod) => mod.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
// { useHash: true }
export class AppRoutingModule {}
