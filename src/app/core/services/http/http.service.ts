import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root",
})
export class HttpService {
  // private handleError: HandleError;
  constructor(private http: HttpClient) {}

  getRequest(url: string) {
    return this.http.get<any>(url);
  }

  postRequest(url: string, data: Object) {
    return this.http.post<any>(`${url}`, data);
  }
  putRequest(url: string, data: Object) {
    return this.http.put<any>(`${url}`, data);
  }
  postRequest3G(url: string, data: Object) {
    return this.http.post<any>(`${url}`, data);
  }

  deteleRequest(url: string, data: Object) {
    return this.http.delete<any>(`${url}`, data);
  }
}
