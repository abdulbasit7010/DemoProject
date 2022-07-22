import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private messageSource = new BehaviorSubject('default message');
  private selectedRow = new BehaviorSubject({});
  private componentRef = new BehaviorSubject('');
  currentMessage = this.messageSource.asObservable();
  currentSelectedRow = this.selectedRow.asObservable();
  currentComponent = this.componentRef.asObservable();
  constructor() { }
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  changeRow(row: object) {
    this.selectedRow.next(row);
  }
  changeComponent(component: any) {
    this.componentRef.next(component);
  }
}
