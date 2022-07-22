import { BrowserModule } from "@angular/platform-browser";
import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { CoreModule } from "./core/core.module";
import { SharedModule } from "./shared/shared.module";
import { FeaturedModule } from "./featured/featured.module";
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClient,
} from "@angular/common/http";
import { PreRequestService } from "./core/services/interceptor";
import { PostRequestService } from "./core/services/interceptor";
import { ErrorHandlerService } from "./core/services/interceptor";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CancelHttpReqService } from "./core/services/cancelHttpReq/cancel-http-req.service";
import { ManageHttpInterceptor } from "./core/services/cancelHttpReq/manageHttp.interceptor";
import { CookieService } from "ngx-cookie-service";
import { AlertModule } from "ngx-alerts";
import { MatTableModule } from "@angular/material/table";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { StringsBasedChargingComponent } from "./featured/stats/service-code/strings-based-charging/strings-based-charging.component";
import { StringsBasedChargingViewComponent } from "./featured/stats/service-code/strings-based-charging-view/strings-based-charging-view.component";

@NgModule({
  declarations: [
    AppComponent,
    StringsBasedChargingComponent,
    StringsBasedChargingViewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    CoreModule,
    SharedModule,
    FeaturedModule,
    NgMultiSelectDropDownModule.forRoot(),
    AlertModule.forRoot({ timeout: 5000 }),
    BrowserAnimationsModule,
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PreRequestService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PostRequestService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ManageHttpInterceptor,
      multi: true,
    },
    CookieService,
    CancelHttpReqService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
