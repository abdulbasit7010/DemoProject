import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService implements HttpInterceptor {
  constructor() {
  }

  static handleError(error: HttpErrorResponse) {
    let errorObj = {};
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorObj = {
        error  : error.error,
        status : error.error.type,
        message: error.error.message,
        url    : error.error.AT_TARGET,
        time   : new Date()
      };
      console.error('[Client][Error][Status][Message][URL][TIME]', {
        error  : error.error,
        status : error.error.type,
        message: error.error.message,
        url    : error.error.AT_TARGET,
        time   : new Date()
      });
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorObj = {
        error  : error.error,
        status : error.status,
        message: error.message,
        url    : error.url,
        time   : new Date()
      };
      console.error('[Server][Error][Status][Message][URL][TIME]', {
        error  : error.error,
        status : error.status,
        message: error.message,
        url    : error.url,
        time   : new Date()
      });
    }
    return throwError({
      success  : false,
      msg      : 'Something bad happened; please try again later.',
      errorCode: environment.errorCode.HTTP_REQUEST,
      error    : errorObj
    });
  }

  // function which will be called for all http calls
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(ErrorHandlerService.handleError));
  }
}

