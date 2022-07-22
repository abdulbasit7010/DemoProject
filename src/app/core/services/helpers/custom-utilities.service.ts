import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomUtilitiesService {

  constructor() {
  }

  static getIDFromObject(obj: any) {
    if (obj && obj._id) {
      return obj._id;
    } else {
      return null;
    }
  }

  static isObjectExisting(arr: any, key: any) {
    let keyIndex: any = -1;
    for (const i in arr) {
      if (arr[i] && arr[i].key === key) {
        keyIndex = i;
        break;
      }
    }
    return keyIndex;
  }
}
