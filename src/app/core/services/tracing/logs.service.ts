import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogsService {

  constructor() {
  }

  logHttpRequestError(obj) {
    console.error(obj);
  }

  logHttpPreRequest(obj) {
    console.log(obj);
  }

  LogHttpResponse(obj) {
    console.log(obj);
  }

  logConsoleError(source, error) {
    console.error(source, error);
  }

  logConsole(source, text) {
    console.log(source, text);
  }
}
