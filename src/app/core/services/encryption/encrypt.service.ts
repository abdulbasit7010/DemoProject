import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment'
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptService {
  constructor() {
  }

  encrypt(str: string) {
    return CryptoJS.AES.encrypt(str.trim(), environment.EncDecKey).toString();
  }

  decrypt(hash: string) {
    return CryptoJS.AES.decrypt(hash.trim(), environment.EncDecKey).toString(CryptoJS.enc.Utf8);
  }
}

