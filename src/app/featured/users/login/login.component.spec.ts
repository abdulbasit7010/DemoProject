import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { LoginComponent } from "./login.component";
import { MatFormField, MatFormFieldModule } from "@angular/material";
import { MaterialModule } from "@app/core/modules/material/material.module";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { FeaturedModule } from "@app/featured/featured.module";
import { ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserService } from "@app/core/services/users/user.service";
import { HttpService } from "@app/core/services/http";
import { HttpClient, HttpHandler } from "@angular/common/http";

// const loginServiceSpy = jasmine.createSpyObj('UserService', ['login']);
describe("LoginComponent", () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: UserService;
  let userServiceStub: UserService;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
      ],
      declarations: [LoginComponent],
      providers: [CookieService, { provide: UserService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    service = TestBed.get(UserService);
    fixture.detectChanges();
  });
  it("needsLogin returns true when the user has not been authenticated", () => {
    spyOn(service, "login").and.callThrough();
    expect(component.onSubmit()).toBeTruthy();
    expect(service.login).toHaveBeenCalled();
  });

  it("needsLogin returns false when the user has been authenticated", () => {
    spyOn(service, "login").and.callThrough();
    expect(component.onSubmit()).toBeFalsy();
    expect(service.login).toHaveBeenCalled();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
