import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http/http.service';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public transactions$;
  url;

  constructor(private httpService: HttpService) { }

  // getListTransactions(obj) {
  //   this.url = `${environment.apiRoutes.TRANSACTIONS}`;
  //   this.transactions$ = new Observable();
  //   this.transactions$ = this.httpService.getRequest(this.url);
  // }
}
