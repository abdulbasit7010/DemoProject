import { Injectable } from "@angular/core";
import { HttpService } from "@core/services/http/http.service";
import { environment } from "../../../../environments/environment";
import { Observable } from "rxjs";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { eventNames } from "process";

@Injectable({
  providedIn: "root",
})
export class AllService {
  public logs$;
  url;

  constructor(private http: HttpClient, private httpService: HttpService) {}

  getServiceCodesList() {
    return this.http.get<any>(`${environment.apiRoutes.getServiceCodes}`);
  }

  addServiceCode(query: any = {}) {
    query.created_by = "Admin";
    const body = query;
    return this.http.post<any>(`${environment.apiRoutes.addServiceCode}`, body);
  }
  updateServiceCode(query = {}, id) {
    return this.http.put<any>(
      `${environment.apiRoutes.updateServiceCode}/${id}`,
      query
    );
  }
  deleteServiceCode(id) {
    return this.http.delete<any>(
      `${environment.apiRoutes.deleteServiceCode}/${id}`
    );
  }
  //calling endpoints for sub service code
  getSubServiceCodesList() {
    return this.http.get<any>(`${environment.apiRoutes.getSubServiceCodes}`);
  }
  addSubServiceCodes(query = {}) {
    const body = query;
    return this.http.post<any>(
      `${environment.apiRoutes.addSubServiceCodes}`,
      body
    );
  }
  updateSubServiceCodes(query = {}, id) {
    return this.http.put<any>(
      `${environment.apiRoutes.updateSubServiceCodes}/${id}`,
      query
    );
  }
  deleteSubServiceCodes(id) {
    return this.http.delete<any>(
      `${environment.apiRoutes.deleteSubServiceCodes}/${id}`
    );
  }
  //calling endpoints for cofigured services
  getServiceConfList(): Observable<any> {
    return this.http.get<any>(`${environment.apiRoutes.getEsmeConfigurations}`);
  }

  addNewServiceConf(query = {}) {
    const body = query;
    return this.http.post<any>(
      `${environment.apiRoutes.addEsmeConfiguration}`,
      body
    );
  }
  updateServiceConf(query, id) {
    return this.http.put<any>(
      `${environment.apiRoutes.updateEsmeConfiguration}/${id}`,
      query
    );
  }
  deleteServiceConf(id) {
    return this.http.delete<any>(
      `${environment.apiRoutes.deleteEsmeConfiguration}/${id}`
    );
  }
  getMenuList() {
    return this.http.get<any>(`${environment.apiRoutes.getMenus}`);
  }

  addMenu(obj, treeWidth, treeHeight) {
    const body = obj;
    body.treeWidth = treeWidth;
    body.treeHeight = treeHeight;
    return this.http.post<any>(`${environment.apiRoutes.addMenu}`, body);
  }
  updateMenu(obj, treeWidth, treeHeight) {
    const body = obj;
    body.treeWidth = treeWidth;
    body.treeHeight = treeHeight;
    return this.http.post<any>(`${environment.apiRoutes.updateMenu}`, body);
  }
  getMenuById(id, name) {
    return this.http.get<any>(
      `${environment.apiRoutes.getMenuById}/${id}/${name}`
    );
  }
  getProfile() {
    return this.http.get<any>(`${environment.apiRoutes.getProfile}`);
  }

  serviceCounts() {
    return this.http.get<any>(`${environment.apiRoutes.serviceCounts}`);
  }

  dateWiseServices(e) {
    return this.http.get<any>(
      `${environment.apiRoutes.dateWiseServices}?st_dt=${e.st_dt}&end_dt=${e.end_dt}`
    );
  }

  deleteMenu(data) {
    return this.http.put<any>(`${environment.apiRoutes.deleteMenu}`, data);
  }

  esmeDetails() {
    return this.http.get<any>(`${environment.apiRoutes.esmeDetails}`);
  }

  treeDetails() {
    return this.http.get<any>(`${environment.apiRoutes.treeDetails}`);
  }

  getStringsBasedCharging() {
    return this.http.get<any>(
      `${environment.apiRoutes.getStringsBasedCharging}`
    );
  }

  addStringsBasedCharging(data) {
    return this.http.post<any>(
      `${environment.apiRoutes.addStringsBasedCharging}`,
      data
    );
  }

  editStringsBasedCharging(data, id) {
    return this.http.put<any>(
      `${environment.apiRoutes.editStringsBasedCharging}`,
      data
    );
  }

  getNormalFlowCodes(flow) {
    return this.http.get<any>(
      `${environment.apiRoutes.getNormalFlowCodes}?flow=${flow}`
    );
  }

  getDtmfsById(id, flow) {
    return this.http.get<any>(
      `${environment.apiRoutes.getDtmfsById}?id=${id}&flow=${flow}`
    );
  }

  getHttpSmppConf(id) {
    return this.http.get<any>(`${environment.apiRoutes.getHttpSmppConf}/${id}`);
  }

  getWhiteListGroups() {
    return this.http.get<any>(`${environment.apiRoutes.getWhiteListGroups}`);
  }
}
