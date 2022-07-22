import { Injectable } from "@angular/core";
import { tap } from "rxjs/operators";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthService } from "../authentication/auth.service";

@Injectable({
  providedIn: "root",
})
export class PostRequestService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(
        (data) => {
          // logging the http response to browser's console in case of a success
          if (data instanceof HttpResponse) {
          }
        },
        (err) => {
          if (err.status == 403) {
            this.authService.logout();
          }
        }
      )
    );
  }
}
