import { Injectable } from '@angular/core';
import * as Notiflix from "notiflix";

@Injectable({
  providedIn : 'root'
})
export class AppService {

  morefunDvc_serial : any;
  deviceUsed! : string;
  insrtcard : boolean = false;
  select_dvc! : boolean;
  isInitialized! : boolean;
  dvcrdy! : boolean;
  deviceVersion : any;
  paxBaseUrl = 'https://127.0.0.1:14000/easyLinkSdkManager'; //Pax D180 Base URl
  constructor() { }

  isConnected() {
    return new Promise<void>((resolve, reject) => {
      // console.log("Checking device connection...");
      fetch(`${this.paxBaseUrl}/isConnected`)
        .then((result) => result.json())
        .then((data) => {
          if (data.code == 0) {
            if (data.data === 'not connected') {
              this.dvcrdy = true;
              this.select_dvc = false;
              resolve();
            } else if (data.data === 'connected') {
              this.isInitialized = true;
              resolve();
            }
          } else {
            // this.ngxSpinner.hide('matmsdkSpinner');
            Notiflix.Loading.remove();
            this.dvcrdy = true;
            console.log(data.msg || 'Device connection error');
            Notiflix.Notify.warning('Failed !!! Try Again', {
              timeout : 2000,
              clickToClose : true,
              closeButton : true,
            });
          }
        })
        .catch((err) => {
          // this.ngxSpinner.hide('matmsdkSpinner');
          Notiflix.Loading.remove();
          this.dvcrdy = true;
          reject('Error!!!');

          // this.VPAModal.show();
          // vex.dialog.alert(
          //   "Please check if ElWeb Service is running and device screen is on"
          // );
        });
    });
  }
}
