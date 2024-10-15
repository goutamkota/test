import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import * as Notiflix from "notiflix";
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { NgIf } from "@angular/common";

@Component({
  selector: 'app-balance-enquiry',
  standalone: true,
  imports : [
    ReactiveFormsModule,
    NgIf,
  ],
  templateUrl: './balance-enquiry.component.html',
  styleUrl: './balance-enquiry.component.scss'
})
export class BalanceEnquiryComponent {
  @ViewChild('modalDefault', { static: false }) private VPAModal: any;
  @Input() matm_balanceform!: FormGroup;
  @Input() insrtcard: Boolean = false;
  @Output() insertOperation: EventEmitter<any> = new EventEmitter();
  @Input() deviceUsed!: string;
  insertcardImage = '../../../../assets/images/unifiedmatm/insertcard.png';
  usr_mbNo: any;
  transactionTypeData!: number;
  dvcrdy!: boolean;
  isInitialized!: boolean;
  select_dvc!: boolean;
  paxBaseUrl = 'https://127.0.0.1:14000/easyLinkSdkManager';

  constructor() {}

  ngOnInit(): void {}

  insert_enq() {
    this.usr_mbNo = this.matm_balanceform?.get('mobilenum')?.value;
    this.transactionTypeData = 31;
    if (this.deviceUsed === 'D180') {
      this.isConnected();
      if (this.transactionTypeData != 1 && this.transactionTypeData) {
        this.insertOperation.emit({
          userMob: this.usr_mbNo,
          device: this.deviceUsed,
        });
      }
    } else if (this.deviceUsed === 'MP63') {
      if (this.transactionTypeData != 1 && this.transactionTypeData) {
        this.insertOperation.emit({
          userMob: this.usr_mbNo,
          device: this.deviceUsed,
        });
      }
    }
  }

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
            Notiflix.Loading.remove();
            this.dvcrdy = true;
            console.log(data.msg || 'Device connection error');
            Notiflix.Notify.warning('Failed !!! Try Again', {
              timeout: 2000,
              clickToClose: true,
              closeButton: true,
            });
          }
        })
        .catch((err) => {
          // this.ngxSpinner.hide('matmsdkSpinner');
          Notiflix.Loading.remove();
          this.dvcrdy = true;
          reject('Error!!!');

          this.VPAModal.show();
          // vex.dialog.alert(
          //   "Please check if ElWeb Service is running and device screen is on"
          // );
        });
    });
  }

  golocalHost() {
    window.open('https://127.0.0.1:14000', '_blank');
    this.VPAModal.hide();
  }
}
