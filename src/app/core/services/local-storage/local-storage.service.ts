import { Injectable } from "@angular/core";
import { EncryptService } from "@core/services/encryption/encrypt.service";
import { LogsService } from "@core/services/tracing";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor(
    private encryptService: EncryptService,
    private logService: LogsService,
    private cookieService: CookieService
  ) {}

  saveData(key, data) {
    if (!data) {
      return { success: false, msg: "No data was provided" };
    }
    data = this.encryptService.encrypt(data);

    localStorage.setItem(key, data);

    const timestamp = new Date().getTime() + 604800000;
    this.cookieService.set(key, data, new Date(timestamp));
    return { success: true };
  }

  getData(key) {
    // let data = this.cookieService.get(key);
    let data = localStorage.getItem(key);
    if (!data) {
      return { success: false, msg: "No data exists against provided key." };
    }
    data = this.encryptService.decrypt(data);
    return { success: true, data: data };
  }

  deleteData(key) {
    this.cookieService.delete(key);
  }

  deleteAll() {
    this.cookieService.deleteAll();
  }
}
