import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from "@core/modules/material/material.module";
import { CustomTableComponent } from "@shared/components/custom-table/custom-table.component";
import { SharedRoutingModule } from "./shared-routing.module";
import { DraftModalComponent } from "./draft-modal/draft-modal.component";
import { SideMainNavComponent } from "./side-main-nav/side-main-nav.component";
import { LoaderComponent } from "./loader/loader.component";
import { NavbarComponent } from "./navbar/navbar.component";

@NgModule({
  imports: [CommonModule, MaterialModule, SharedRoutingModule],
  exports: [
    CustomTableComponent,
    SideMainNavComponent,
    LoaderComponent,
    NavbarComponent,
  ],
  entryComponents: [],
  declarations: [
    CustomTableComponent,
    DraftModalComponent,
    SideMainNavComponent,
    LoaderComponent,
    NavbarComponent,
  ],
})
export class SharedModule {}
