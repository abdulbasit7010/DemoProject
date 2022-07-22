import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CancelHttpReqService {
  pendingHttpRequest$=new Subject<void>();
  constructor() { }

  cancelPendingRequests(){
    this.pendingHttpRequest$.next();
  }

  onCancelPendingRequests(){
    return this.pendingHttpRequest$.asObservable();
  }
}
