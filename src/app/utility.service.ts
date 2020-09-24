import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }

  public showLoader(){
    var loaderElm = document.getElementById("ftco-loader");
    loaderElm.classList.add("show");
  }

  public hideLoader(){
    var loaderElm = document.getElementById("ftco-loader");
    loaderElm.classList.remove("show");
  }

  public findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        if(array[i][attr] === value) {
            return i;
        }
    }
    return -1;
  }
}
