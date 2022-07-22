import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersModule } from "@featured/users/users.module";
import { StatsModule } from "@featured/stats/stats.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    StatsModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [UsersModule, StatsModule],
  declarations: [],
})
export class FeaturedModule {}
