import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { RouterLink } from "@angular/router";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import * as Notiflix from "notiflix";
import JSONBigint from 'json-bigint';
import axios from 'axios';
import { Buffer } from 'buffer';
import { CashwithdrawalComponent } from "./cashwithdrawal/cashwithdrawal.component";
import { AppService } from "../app.service";
import { BalanceEnquiryComponent } from "./balance-enquiry/balance-enquiry.component";


@Component({
  selector : 'app-matm-page',
  standalone : true,
  imports : [NgbNavModule, RouterLink, ReactiveFormsModule, CashwithdrawalComponent, BalanceEnquiryComponent],
  templateUrl : './matm-page.component.html',
  styleUrl : './matm-page.component.scss'
})
export class MatmPageComponent implements OnInit {
  active : number = Number(sessionStorage.getItem('pagename')) || 1;
  matm_amntform! : FormGroup;
  matm_balanceform! : FormGroup;
  appService = inject(AppService)
  cashwithdraw : boolean = true;
  balance_Enq! : boolean;
  transactionbadge! : string[];
  value : any = '';
  trn_dtl : boolean = false;
  activ : number | null | undefined;
  messagePin! : boolean;
  deviceSlNo : any;
  userName : any;
  token : any;
  key_tpk : any;
  dvcrdy : boolean = true;
  operation : string | null | undefined;
  paxBaseUrl = 'https://127.0.0.1:14000/easyLinkSdkManager';
  morefunBaseUrl : string = 'http://localhost:16000/mp63';
  txnResult! : boolean;
  deviceData : any;
  trackData : any;
  pinBlock : any;
  @ViewChild('modalDefault', { static : false }) private VPAModal : any;
  transactionType : string | null | undefined;
  lat : string | number | null | undefined;
  long : string | number | null | undefined;
  matmBaseUrl = 'https://apidev-sdk.iserveu.online/staging/mATMV2';
  set8AResult : any;
  doBalanceEnquiryResult : any;
  set89Result : any;
  set031EResult : any;
  paramC : any;
  isInitialized! : boolean;
  paramA : any;
  paramB : any;
  doCashWithdrawalResult : any;
  transactionTypeData : number | null | undefined;
  token1 : any;
  key : any;
  txn_ID : any;
  data_tran : any;
  data_msg : any;
  BALANCE_amt : number | null | undefined;
  transaction_Data : any;
  enqbalance : any;
  Transaction_ID : any;
  Transaction_time : any;
  bn_eq! : boolean;
  printBtn : HTMLElement | null = null;
  cardnumber : any;
  txStatus : any;
  rrn : any;
  TID : any;
  cbalance : any;
  MID : any;
  remarks : any;
  mobileNum1 : any;
  tran_TYpe : any;
  docDefinition : any;
  myamount : any;
  amount : any;
  wdAmt : any;
  failcase! : boolean;
  data1 : any;
  txnId : any;
  status_check! : boolean;
  txn_Date : any;
  datetime : string | null | undefined;
  set0308Result : any;
  cardHolderName : string | null | undefined;
  val = 0;
  statColor : any;
  validamt : any;
  statusReport : any;
  txnStatus : any;
  newStrstatus : any;
  usr_mbNo : any;
  userData : any;
  brand : any;
  shopname : any;
  opperformed : string | null | undefined;
  tran_amt : any;
  panserialno : any;
  pansn : any;
  remarkstatus : any;
  // Image Binding

  succImage = ('../../../../assets/images/unifiedmatm/success.svg');
  failImage = ('../../../../assets/images/unifiedmatm/failcase.png');
  insertcardImage = ('../../../../assets/images/unifiedmatm/insertcard.png');
  insertImage = ('../../../../assets/images/unifiedmatm/insert.svg');
  iconImage = ('../../../../assets/images/unifiedmatm/icon.png');
  demo2 : any;
  demo3 : any;
  select_dvc : boolean = false;
  devices = [
    {
      id : 'D180',
      name : 'PAX D180',
      img : ('../../../../assets/images/unifiedmatm/pax.png'),
      showTick : false,
    },
    {
      id : 'MP63',
      name : 'MORFUN MP63',
      img : ('../../../../assets/images/unifiedmatm/morefun233.png'),
      showTick : false,
    },
  ];
  deviceUsed : any;
  device_data : any = [];
  deviceList : any;
  selectedFile : File | null = null;
  track2dataMorefun : any;
  pansnMorefun : any;
  icDatamoreFun : any;
  finalIcData : string | null | undefined;
  morefunpinBlock : any;
  morefunPansn : string | null | undefined;
  BalanceEnquiryResult : void | null = null;
  tempinput! : boolean;
  avlble_device : any;
  mAdress_MP : any;
  emvTranSaction : number | null | undefined;
  trans_mf_name : string | null | undefined;
  amountMF : string | null | undefined;
  finalIcModifyBE : string | null | undefined;
  completestatusId! : string;
  client_IP : any;
  dashboardData : any;
  arrow_mark : any;
  statusPage! : string | null | undefined;
  clientId : string | null | undefined;
  Client_Secret : string | null | undefined;
  apiusername! : string | null | undefined;


  constructor() {
    this.clientId = sessionStorage.getItem('clientId');
    this.Client_Secret = sessionStorage.getItem('clientSecret');
    this.apiusername = sessionStorage.getItem('apiusername');
    this.deviceUsed = this.appService.deviceUsed;
  }

  errorCodes : any;


  ngOnInit() {
    this.matm_amntform = new FormGroup({
      amountSelect : new FormControl('', [Validators.required, Validators.max(10000), Validators.min(100)]),
      mobilenum : new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    })
    this.matm_balanceform = new FormGroup({
      mobilenum : new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)])
    })
    this.clientId = sessionStorage.getItem('clientId');
    this.Client_Secret = sessionStorage.getItem('clientSecret');
    this.apiusername = sessionStorage.getItem('apiusername');
  }

  initiateMorfunCashWithdrawl = (amount : any, mobno : any) => {
    return new Promise((resolve, reject) => {
      this.read_card(amount).then((data : any) => {
        this.getDateAndTime().then(() => {
          this.domorefunCashWithdrawl(amount, mobno).then(() => {
            console.log(this.doCashWithdrawalResult);
            if (this.doCashWithdrawalResult.status == -1) {
              reject('Error while processing request');
            } else if (this.doCashWithdrawalResult.status == 0) {
              let parsed = JSON.parse(this.doCashWithdrawalResult.statusDes);
              if (parsed['39'] == '0000') {
                this.completestatusId = 'APPROVED';
              } else {
                this.completestatusId = 'DECLINE';
              }
              console.log(this.completestatusId);
              console.log(parsed['55']);
              this.onlineAuthmorefun(parsed['55']).then((data : any) => {
                console.log(data);
                this.completeTransactionISU(
                  this.completestatusId,
                  this.doCashWithdrawalResult.txnId
                )
                  .then((succresponse : any) => {
                    const response = this.parseResponse(
                      parsed,
                      this.doCashWithdrawalResult.txnId,
                      this.doCashWithdrawalResult.txn_card_type,
                      this.doCashWithdrawalResult.cardHolderName
                    );
                    resolve(response);
                    this.cashwithdraw = false;
                    this.balance_Enq = false;
                    this.bn_eq = false;
                    this.trn_dtl = true;
                    Notiflix.Loading.remove();
                  })
                  .catch((sucErr : any) => {
                    throw new Error(sucErr);
                  });
              });
            }
          });
        });
      });
    });
  };
  domorefunCashWithdrawl = (packet : any, mbleno : any) => {
    console.log('Balance withdrawal API called');
    this.transactionType = 'CASH WITHDRAWAL';
    this.wdAmt = packet;
    this.paramC = mbleno;
    console.log(this.wdAmt);
    return new Promise<void>(async (resolve, reject) => {
      const obj = {
        pansn : this.morefunPansn,
        amount : this.generateTxnAmount(this.wdAmt),
        trackData : this.track2dataMorefun,
        deviceSerial : this.appService.morefunDvc_serial,
        pinblock : this.morefunpinBlock,
        deviceData : this.finalIcData,
        transactionType : '01',
        isFallback : 'no',
        txn_card_type : '',
        txnLatitude : this.lat,
        txnLongitude : this.long,
        paramA : this.paramA || '',
        paramB : '',
        paramC : '',
        retailer : this.userName,
        isSL : false,
        timestamp : this.datetime,
        cardHolderName : this.cardHolderName,
        clientInfo :
          '{"deviceType":"Morefun MP63","platformType":"WEBUSER","mobileNo":"' +
          this.paramC +
          '","deviceSerialNo":"' +
          this.appService.morefunDvc_serial +
          '","deviceVersion":"' +
          this.appService.deviceVersion +
          '","AppVersion":"1.0.0.4"}',
      };
      axios
        .post(`${this.matmBaseUrl}/doCashWithdralForSdk`, obj, {
          headers : {
            'Content-Type' : 'application/json',
            Client_id : this.clientId,
            Client_Secret : this.Client_Secret,
            UserSourceAgent : 'ANDROIDSDK'
          },
          transformResponse : (data : any) => JSONBigint.parse(data),
        })
        .then((result : any) => {
          if (result.data.status == 0) {
            this.doCashWithdrawalResult = result.data;
            this.remarkstatus = result.data.statusCode;
            console.log(this.doCashWithdrawalResult, '!!1151');
            resolve();
          } else if (result.data.status == -1) {
            Notiflix.Report.failure(result.data.statusDes, '', 'ok');
            Notiflix.Loading.remove();
          } else {
            reject(result.data);
          }
        })
        .catch((err : any) => {
          console.log(err);
          // vex.alert.dialog()
          Notiflix.Report.failure('Some Problem Occurred', '', 'ok');
          reject(err);
        });
    });

  };
  onlineAuthmorefun = (packet : any) => {
    return new Promise((resolve, reject) => {
      console.log('Perform online Auth...');
      fetch(`${this.morefunBaseUrl}/online_auth?authData=${packet}`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin' : '*',
        },
      })
        .then((result : any) => resolve(result))
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  generateTxnAmount = (amount : any) => {
    const finalAmount = amount * 100;
    const trailingZeroes = 12 - `${finalAmount}`.length;
    const txnAmount = `${'0'.repeat(trailingZeroes)}${finalAmount}`;
    return txnAmount;
  };
  getCurrentLocation = () => {
    // return new Promise((resolve, reject) => {
    if (navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude || '';
        this.long = position.coords.longitude || '';
      });
    }
  };
  hex_to_ascii = (str1 : any) => {
    let hex = str1.toString();
    let str = '';
    for (let n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  };
  fetchTxnDate = () => {
    const d = new Date(Date.now());
    const yy = `${d.getFullYear()}`.substr(2);
    const mm = d.getMonth();
    const dd = d.getDate();
    const date = `${yy}${mm + 1 >= 10 ? mm + 1 : '0' + (mm + 1)}${dd >= 10 ? dd : '0' + dd
    }`;
    return date;
  };
  fetchTxnTime = () => {
    const d = new Date(Date.now());
    const hh = d.getHours();
    const mm = d.getMinutes();
    const ss = d.getSeconds();
    const time = `${hh >= 10 ? hh : '0' + hh}${mm >= 10 ? mm : '0' + mm}${ss >= 10 ? ss : '0' + ss
    }`;
    return time;
  };
  parseResponse = (statusDesc : any, txanId : any, txn_card_type : any, cardHolderName : any) => {
    // const data = JSON.parse(pData);
    const packet = statusDesc;
    const txnId = txanId;
    let response : any = {};
    if (packet[54]) {
      let cryptedAmount = packet[54];
      //  let leftAmount = cryptedAmount.substr(0, 20);
      let rightAmount = cryptedAmount.substr(20, cryptedAmount.length);
      let rightBalanceAmount = rightAmount.substr(7);
      if (rightBalanceAmount.startsWith('C')) {
        response['BALANCE'] = parseInt(rightBalanceAmount.substr(1)) / 100;
        // response["BALANCE"] =  this.BALANCE_amt;
      } else {
        response['BALANCE'] = -parseInt(rightBalanceAmount.substr(1)) / 100;
      }
    } else {
      response['BALANCE'] = 'N/A';
    }

    if (packet[39]) {
      response['RESPONSE_CODE'] = packet[39];
      const resCode : any = packet[39].substr(2);
      if (resCode == '00') {
        response['STATUS'] = 'SUCCESS';
        response['RESPONSE_CODE'] = resCode || 'N/A';
        response['REMARKS'] = 'Transaction Successful';
        response['MOBILE_NO'] = this.paramC === '' ? 'N/A' : this.paramC;
      } else {
        response['STATUS'] = 'FAILED';
        response['RESPONSE_CODE'] = resCode || 'N/A';
        response['REMARKS'] = this.errorCodes[resCode] || this.remarkstatus;
        response['MOBILE_NO'] = this.paramC === '' ? 'N/A' : this.paramC;
      }
    }

    if (packet[37]) {
      response['RRN'] = packet[37] || 'N/A';
    }

    if (packet[41]) {
      response['MID'] = packet[41] || 'N/A';
    }

    if (packet[42]) {
      response['TID'] = packet[42] || 'N/A';
    }

    if (packet[35]) {
      response['CARD_NUMBER'] = packet[35] || 'N/A';
    }

    if (txnId) {
      response['TXN_ID'] = txnId || 'N/A';
    }
    response['TRANSACTION_TYPE'] = this.transactionType || 'N/A';
    response['TRANSACTION_AMOUNT'] = this.amount || this.wdAmt;

    // const d = new Date(Date.now());
    // const time = d.toLocaleString();
    response['TRANSATION_TIME'] = this.datetime;
    // response.CARD_HOLDER_NAME = (this.hex_to_ascii(this.get5F20Data())) ? this.hex_to_ascii(this.get5F20Data()) : "N/A";
    response['CARD_TYPE'] = txn_card_type;
    response['CARD_HOLDER_NAME'] = cardHolderName;
    return response;
  };
  completeTransaction = () => {
    return new Promise((resolve, reject) => {
      console.log('Completing transaction...');
      fetch(`${this.paxBaseUrl}/completeTransaction`)
        .then((result : any) => result.json())
        .then((data : any) => {
          resolve(data);
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };
  set031E = (packet : any) => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Setting 031E...`);
      fetch(
        `${this.paxBaseUrl}/setData/1?datatype=TRANSACTION_DATA&tlvData=${packet}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.set031EResult = data;
            resolve();
          } else {
            console.log(`Set 031E error!`, data);
            reject();
          }
        })
        .catch((err : any) => {
          console.log(`Set 031E error!`, err);
          reject();
        });
    });
  };
  set89 = (packet : any) => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Setting 89...`);
      fetch(
        `${this.paxBaseUrl}/setData/1?datatype=TRANSACTION_DATA&tlvData=8903${packet}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.set89Result = data;
            resolve();
          } else {
            console.log(`Set 89 error!`, data);
            reject();
          }
        })
        .catch((err : any) => {
          console.log(`Set 89 error!`, err);
          reject();
        });
    });
  };
  set8A = (packet : any) => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Setting 8A...`);
      fetch(
        `${this.paxBaseUrl}/setData/1?datatype=TRANSACTION_DATA&tlvData=8A02${packet}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.set8AResult = data;
            resolve();
          } else {
            console.log(`Set 8A error!`, data);
            reject();
          }
        })
        .catch((err : any) => {
          console.log(`Set 8A error!`, err);
          reject();
        });
    });
  };
  set0308 = (packet : any) => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Setting 0308...`);
      fetch(
        `${this.paxBaseUrl}/setData/2?datatype=CONFIGURATION_DATA&tags=0308&values=${packet}`,
        {
          method : 'post',
        }
      )
        .then((result : any) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.set0308Result = data;
            console.log(data);
            resolve();
          } else {
            console.log(`Set 0308 error!`, data);
            reject();
          }
        })
        .catch((err : any) => {
          console.log(`Set 0308 error!`, err);
          reject();
        });
    });
  };
  completeTransactionISU = (msg : any, txnId : any) => {
    return new Promise<void>(async (resolve, reject) => {
      this.txn_ID = txnId.toString();
      console.log(this.txn_ID);
      let statusId;
      statusId = msg;
      if (this.operation == 'BE') {
        let parsed = JSON.parse(this.doBalanceEnquiryResult.statusDes);
        if (parsed['39'] == '0000') {
          statusId = 'APPROVED';
        } else {
          statusId = 'DECLINE';
        }
      }
      if (this.operation == 'CW') {
        let parsed = JSON.parse(this.doCashWithdrawalResult.statusDes);
        console.log(parsed);

        if (parsed['39'] == '0000') {
          statusId = 'APPROVED';
        } else {
          statusId = 'DECLINE';
        }
      }
      let obj : any = { id : this.txn_ID, status : statusId };

      axios.post(`${this.matmBaseUrl}/completetransaction`, obj, {
        headers : {
          'Content-Type' : 'application/json',
          Client_id : this.clientId?.toString(),
          Client_Secret : this.Client_Secret?.toString(),
          'UserSourceAgent' : 'ANDROIDSDK'
        }
      })
        .then((result : any) => result.json())
        .then((data : any) => {
          console.log(data.statusDesc);
          resolve(data);
        })
        .catch((err : any) => {
          console.log(err);
          reject(err);
        });
    });
  };
  getDateAndTime = () => {
    return new Promise<void>((resolve, reject) => {
      fetch('https://worldtimeapi.org/api/timezone/Asia/Kolkata')
        .then((res : any) => res.json())
        .then((ress : any) => {
          let nd = ress.datetime;
          let arr = nd.split('T');
          let arr1 = arr[1].split('.');
          let finalArr = arr[0] + ' ' + arr1[0];
          this.datetime = finalArr;
          this.client_IP = ress.client_ip;
          resolve();
        })
        .catch((err : any) => {
          console.log(err);
          reject(err);
        });
    });
  };

  read_card = (amount : any) => {
    return new Promise((resolve, reject) => {
      console.log('Read Card Data...');
      console.log(amount, 'Read cardamount');
      this.activ = 1;
      if (this.transactionTypeData == 31) {
        this.trans_mf_name = 'Balance';
        this.emvTranSaction = 26;
        this.amountMF = '0000';
      } else if (this.transactionTypeData == 1) {
        this.trans_mf_name = 'Sale';
        this.emvTranSaction = 1;
        this.amountMF = amount + '00';
      }
      let read_data = {
        cardTimeout : 60,
        transName : this.trans_mf_name,
        allowfallback : true,
        amount : this.amountMF,
        pinInput : 1,
        pinMaxLen : 6,
        requiretype : 1,
        tags : [
          'EMV_TAG_9F02_TM_AUTHAMNTN',
          'EMV_TAG_9F26_IC_AC',
          'EMV_TAG_9F27_IC_CID',
          'EMV_TAG_9F10_IC_ISSAPPDATA',
          'EMV_TAG_9F37_TM_UNPNUM',
          'EMV_TAG_9F36_IC_ATC',
          'EMV_TAG_95_TM_TVR',
          'EMV_TAG_9A_TM_TRANSDATE',
          'EMV_TAG_9C_TM_TRANSTYPE',
          'EMV_TAG_5F2A_TM_CURCODE',
          'EMV_TAG_82_IC_AIP',
          'EMV_TAG_9F1A_TM_CNTRYCODE',
          'EMV_TAG_9F03_TM_OTHERAMNTN',
          'EMV_TAG_9F33_TM_CAP',
          'EMV_TAG_9F34_TM_CVMRESULT',
          'EMV_TAG_9F35_TM_TERMTYPE',
          'EMV_TAG_84_IC_DFNAME',
          'EMV_TAG_9F09_TM_APPVERNO',
          'EMV_TAG_9F63_TM_BIN',
          'EMV_TAG_9F41_TM_TRSEQCNTR',
          'EMV_TAG_9F20_IC_TRACK2DATA',
          'EMV_TAG_9F1E_TM_IFDSN',
        ],
        emvTransactionType : this.emvTranSaction,
      };

      fetch(`${this.morefunBaseUrl}/read_card`, {
        method : 'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin' : '*',
        },
        body : JSON.stringify(read_data),
      })
        // .then((result) => resolve(result))
        // // .then((data:any) => {
        // //   console.log(data);
        // // })
        .then((result : any) => result.json())
        .then((data : any) => {
          console.log(data);
          if (data) {
            this.activ = 0;
            Notiflix.Loading.hourglass();
            this.track2dataMorefun = data.data.track2;
            this.pansnMorefun = data.data.pansn;
            this.icDatamoreFun = data.data.icData;
            this.morefunpinBlock = data.data.pinblock;
            this.cardHolderName = data.data.cardname;
            // Implemented pansn to avoid ARQC error
            let newPanSn = '';
            switch (this.pansnMorefun) {
              case '00':
                newPanSn = '0';
                break;
              case '03':
                newPanSn = '3';
                break;
              case '15':
                newPanSn = '15';
                break;
              case '01':
                newPanSn = '1';
                break;
              default:
                newPanSn = '0';
                break;
            }
            console.log('newPanSn==>', newPanSn);
            this.morefunPansn = newPanSn;
            // return
            let nineFData = this.icDatamoreFun.substring(
              0,
              this.icDatamoreFun.indexOf('9F1E08')
            );
            console.log('nineFData==>', nineFData);
            let sevenAData = this.icDatamoreFun.substring(
              this.icDatamoreFun.indexOf('8407A'),
              this.icDatamoreFun.length
            );
            console.log('sevenAData==>', sevenAData);
            let lastEightDigits = this.appService.morefunDvc_serial;
            console.log('lastEightDigits==>', lastEightDigits);
            let modifiedHexaValue =
              Buffer.from(lastEightDigits).toString('hex');
            console.log('Slno', modifiedHexaValue);
            this.finalIcData =
              nineFData + '9F1E08' + modifiedHexaValue + sevenAData;
            console.log('finalIcData==>', this.finalIcData);

            // if (this.transactionTypeData == 31) {
            //   let addZeroOneNC = this.finalIcModifyBE
            //   const splitNC = addZeroOneNC.split('9C01')
            //   let replaceNC = splitNC[1].replace(/^.{2}/g, '31')
            //   this.finalIcData = splitNC[0] + "9C01" + replaceNC
            //   console.log("finalIcModify==>", this.finalIcData);
            // }

            // let nineCData = this.icDatamoreFun.substring(0, this.icDatamoreFun.indexOf("9C01"));
            // console.log("nineCData==>", nineCData);
            // let fiveFData = this.icDatamoreFun.substring(this.icDatamoreFun.indexOf("5F2A"),this.icDatamoreFun.length);
            // console.log("fiveFData==>", fiveFData);
            // this.finalIcData = nineCData + "5F2A" + fiveFData;
            // console.log("finalIcData==>", this.finalIcData);
          }
          resolve(data);
        })
        .catch((err : any) => {
          console.log(err);
          Notiflix.Loading.remove();
          this.activ = 0;
          reject();
        });
    });
  };

  initialiseCashWithDrawal(cw_data : any) {
    let validamt = cw_data.amount;
    this.usr_mbNo = cw_data.userMob;
    this.messagePin = false;
    this.transactionTypeData = 1;
    this.myamount = validamt;
    if (this.deviceUsed === 'D180') {
      this.isConnected();
      if (
        this.transactionTypeData == 1 &&
        this.myamount >= 100 &&
        this.transactionTypeData
      ) {
        this.intiateCashWithdrawal(this.myamount, this.usr_mbNo)
          .then((sucess : any) => {
            console.log('call', this.transactionTypeData);
            this.showReceipt(sucess, this.transactionTypeData);
          })
          .catch((err : any) => {
            console.log(err);
          });
      }
    } else if (this.deviceUsed === 'MP63') {
      if (
        this.transactionTypeData == 1 &&
        this.myamount >= 100 &&
        this.transactionTypeData
      ) {
        this.initiateMorfunCashWithdrawl(this.myamount, this.usr_mbNo)
          .then((sucess : any) => {
            this.showReceipt(sucess, this.transactionTypeData);
          })
          .catch((err : any) => {
            console.log(err);
          });
      }
    }
  }

  showReceipt = (s : any, t : any) => {
    console.log(s);
    console.log(t);
    this.transaction_Data = s;
    console.log(this.transaction_Data, '@@@');
    this.enqbalance = this.transaction_Data.BALANCE;
    console.log(this.enqbalance, '!!!!!');
    this.Transaction_ID = this.transaction_Data.TXN_ID;
    this.Transaction_time = this.transaction_Data.TRANSATION_TIME;
    this.cardnumber = this.transaction_Data.CARD_NUMBER;
    this.txStatus = this.transaction_Data.STATUS;
    this.rrn = this.transaction_Data.RRN;
    this.TID = this.transaction_Data.TID;
    this.cbalance = this.transaction_Data.BALANCE;
    this.MID = this.transaction_Data.MID;
    this.remarks = this.transaction_Data.REMARKS;
    this.mobileNum1 = this.transaction_Data.MOBILE_NO;
    this.tran_TYpe = this.transaction_Data.TRANSACTION_TYPE;
    this.tran_amt = this.transaction_Data.TRANSACTION_AMOUNT;
    this.opperformed = 'mATM';
    if (this.txStatus === 'SUCCESS') {
      this.failcase = true;
      this.statColor = 'green';
    } else {
      this.failcase = false;
      this.statColor = 'red';
    }
    this.printReceipt();
  };

  async printReceipt() {
    this.docDefinition = {
      pageSize : 'A6',
      pageMargins : [35, 10, 35, 10],
      background : function (currentPage : any, pageSize : any) {
        return {
          table : {
            widths : [pageSize.width - 30],
            heights : [pageSize.height - 30],
            body : [['']],
          },
          margin : 10,
        };
      },
      content : [
        {
          image : await this.getBase64ImageFromURL(this.demo3),
          width : 100,
          height : 35,
          alignment : 'center',
        },
        {
          columns : [
            {
              text : this.shopname,
              bold : true,
              fontSize : 14,
              alignment : 'center',
              margin : [0, 8, 0, 0],
            },
          ],
        },
        {
          columns : [
            {
              text : 'Receipt',
              bold : true,
              fontSize : 12,
              alignment : 'center',
              margin : [0, 8, 0, 0],
            },
          ],
        },
        {
          columns : [
            {
              text : this.txStatus,
              bold : true,
              fontSize : 14,
              color : this.statColor,
              alignment : 'center',
              margin : [0, 8, 0, 0],
            },
          ],
        },
        {
          columns : [
            {
              margin : [0, 10, 0, 0],
              table : {
                widths : [490],
                heights : [10, 10],
                border : [false, false, false, false],
                // color: '#ddd',
                body : [
                  [
                    {
                      text : 'Date/Time. : ' + this.Transaction_time,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'Operation Performed : ' + this.opperformed,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          columns : [
            {
              text : 'Transaction Details',
              bold : true,
              fontSize : 12,
              alignment : 'center',
              margin : [0, 8, 0, 0],
            },
          ],
        },
        {
          columns : [
            {
              margin : [0, 10, 0, 0],
              table : {
                widths : [490],
                heights : [
                  10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 20, 10, 10, 10, 10,
                  10, 10, 10, 10, 10,
                ],
                border : [false, false, false, false],
                body : [
                  [
                    {
                      text : `Transaction ID : ` + this.Transaction_ID,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'MID : ' + this.TID,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'Terminal ID : ' + this.MID,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'RRN : ' + this.rrn,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'Card No. : ' + this.cardnumber,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'Mobile Number : ' + this.mobileNum1,
                      fontSize : 10,
                      // alignment: 'center',
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'Balance Amount : Rs.' + this.cbalance,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'Transaction Type : ' + this.tran_TYpe,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                  [
                    {
                      text : 'Transaction Amount : Rs.' + this.tran_amt,
                      fontSize : 10,
                      border : [false, false, false, false],
                    },
                  ],
                ],
              },
            },
          ],
        },
        {
          columns : [
            {
              image : await this.getBase64ImageFromURL(this.demo2),
              width : 60,
              height : 40,
              alignment : 'left',
            },
            [
              {
                text : 'Thank You',
                bold : true,
                fontSize : 10,
                color : '#22C6C8',
                alignment : 'right',
              },
              {
                text : this.brand,
                bold : true,
                fontSize : 12,
                alignment : 'right',
              },
            ],
          ],
        },
        // {
        //   columns: [{
        //     margin: [0, 10, 0, 0],
        //     table: {
        //       widths: [230],
        //       heights: [10],
        //       color: '#ddd',
        //       body: [
        //         [{
        //           text: 'Customer Copy',
        //           fontSize: 12,
        //           alignment: 'center',
        //           margin: [0, 4, 0, 0]
        //         }],
        //       ]
        //     }
        //   }]
        // }
      ],

      styles : {
        status : {
          margin : [0, 30, 0, 0],
        },
        tableExample : {
          margin : [0, 30, 0, 0],
        },
        header : {
          margin : [0, 5, 0, 0],
          fontSize : 15,
          bold : true,
        },
        bigger : {
          fontSize : 10,
          italics : true,
        },
        footer : {
          margin : [420, 0, 0, 4],
          fontSize : 13,
          bold : true,
        },
      },
    };
  }

  getBase64ImageFromURL(url : any) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        let canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        let ctx : any = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0);

        let dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error : any) => {
        reject(error);
      };

      img.src = url;
    });
  }

  intiateCashWithdrawal = (amount : any, mobNo : any) => {
    console.log('ll', amount);
    return new Promise((resolve, reject) => {
      if (this.isInitialized) {
        this.operation = 'CW';
        this.paramC = mobNo;
        this.amount = amount;
        this.initiateProcess({
          type : 0,
          userName : this.paramA,
          amount : this.amount,
        })
          .then((result : any) => {
            console.log(result);
            resolve(result);
          })
          .catch((err : any) => {
            // showAlert("Error", err, tempModalElem.options.alert);
            // hideLoader();
            throw new Error(err);
          });
      } else {
        // this.ngxSpinner.hide('matmsdkSpinner');
        Notiflix.Loading.remove();
        console.log('SDK initializing failed!');
      }
    });
  };
  initiateProcess = (packet : any) => {
    const { amount, type } = packet;
    return new Promise((resolve, reject) => {
      if (!this.dvcrdy) {
        this.setTxnData().then(() => {
          this.startTransaction()
            .then(() => {
              // this.ngxSpinner.show("matmsdkSpinner", { bdColor: "rgba(0, 0, 0, 0.5)", type: "timer" });
              Notiflix.Loading.hourglass();
              this.getCardType();
              this.get5F20Data();
              this.get5F34data().then((cardType : any) => {
                console.log(cardType);
                let card = `${cardType}`.substr(10);
                if (card === '01') {
                  console.log(`Card type 01`);
                  this.getTxnResult()
                    .then(this.getDeviceData)
                    .then(this.getTrackData)
                    .then(this.getPinBlock)
                    .then(this.getDateAndTime)
                    .then(() => {
                      if (type == 0) {
                        this.doCashWithdrawal({
                          amount : this.amount,
                        })
                          .then(this.completeTransaction)
                          .then((data : any) => {
                            this.data_tran = data;
                            this.completeTransactionISU(
                              this.data_tran.msg,
                              this.doCashWithdrawalResult.txnId
                            )
                              //till this new
                              .then(() => {
                                const response = this.parseResponse(
                                  this.doCashWithdrawalResult.cardHolderName,
                                  this.doCashWithdrawalResult.txn_card_type,
                                  this.doCashWithdrawalResult.txanId,
                                  this.doCashWithdrawalResult.statusDesc
                                );
                                resolve(response);
                              })
                              .catch((err : any) => {
                                // this.ngxSpinner.hide('matmsdkSpinner');
                                Notiflix.Loading.remove();
                                // vex.dialog.alert(err.statusDes);
                                Notiflix.Report.failure(
                                  err.statusDes,
                                  '',
                                  'ok'
                                );
                                // showAlert(
                                //   "Error",
                                //   err.statusDes
                                //     ? err.statusDes
                                //     : "Some Problem Occoured",
                                //   tempModalElem.options.alert
                                // );
                              });
                          });
                      } else if (type == 1) {
                        this.doBalanceEnquiry()
                          // this.doBalanceEnquiry()
                          .then(this.completeTransaction)
                          .then((data : any) => {
                            console.log(data);
                            this.data_tran = data;
                            this.completeTransactionISU(
                              this.data_tran.msg,
                              this.doBalanceEnquiryResult.txnId
                            ).then(() => {
                              const response = this.parseResponse(
                                this.doCashWithdrawalResult.cardHolderName,
                                this.doCashWithdrawalResult.txn_card_type,
                                this.doCashWithdrawalResult.txanId,
                                this.doCashWithdrawalResult.statusDesc
                              );
                              resolve(response);
                            });
                          });
                      }
                    });
                } else {
                  this.getTxnResult().then(() => {
                    if (this.txnResult) {
                      this.getDeviceData()
                        .then(this.getTrackData)
                        .then(this.getPinBlock)
                        .then(this.getDateAndTime)
                        .then(() => {
                          if (type == 0) {
                            this.doCashWithdrawal({
                              amount : this.amount,
                            })
                              .then(() => {
                                console.log(this.doCashWithdrawalResult);
                                if (this.doCashWithdrawalResult.status == -1) {
                                  reject(
                                    'Error while processing withdraw request'
                                  );
                                } else if (
                                  this.doCashWithdrawalResult.status == 0
                                ) {
                                  let parsed = JSON.parse(
                                    this.doCashWithdrawalResult.statusDes
                                  );
                                  if (parsed['39'].substr(2) == '00') {
                                    this.set8A(parsed['39']);
                                    this.set89(parsed['38']);
                                    this.set031E(parsed['55']);
                                    this.set0308('00');
                                    this.completeTransaction().then((data : any) => {
                                      console.log(data);
                                      this.data_tran = data;
                                      this.completeTransactionISU(
                                        this.data_tran.msg,
                                        this.doCashWithdrawalResult.txnId
                                      )
                                        .then((sucResult) => {
                                          let parsedDesc = JSON.parse(
                                            this.doCashWithdrawalResult
                                              .statusDes
                                          );
                                          const response = this.parseResponse(
                                            parsedDesc,
                                            this.doCashWithdrawalResult.txnId,
                                            this.doCashWithdrawalResult
                                              .txn_card_type,
                                            this.doCashWithdrawalResult
                                              .cardHolderName
                                          );
                                          resolve(response);
                                          this.cashwithdraw = false;
                                          this.balance_Enq = false;
                                          this.bn_eq = false;
                                          this.trn_dtl = true;
                                          // this.ngxSpinner.hide('matmsdkSpinner');
                                          Notiflix.Loading.remove();
                                        })
                                        .catch((sucErr : any) => {
                                          throw new Error(sucErr);
                                        });
                                    });
                                  } else {
                                    this.set8A(parsed['39']);
                                    this.set89(parsed['38']);
                                    this.set031E(this.deviceData);
                                    this.set0308('00');
                                    this.completeTransaction().then((data : any) => {
                                      console.log(data);
                                      this.data_tran = data;
                                      console.log(this.data_tran.msg);
                                      this.completeTransactionISU(
                                        this.data_tran.msg,
                                        this.doCashWithdrawalResult.txnId
                                      )
                                        .then((sucResult) => {
                                          let parsedDesc = JSON.parse(
                                            this.doCashWithdrawalResult
                                              .statusDes
                                          );
                                          const response = this.parseResponse(
                                            parsedDesc,
                                            this.doCashWithdrawalResult.txnId,
                                            this.doCashWithdrawalResult
                                              .txn_card_type,
                                            this.doCashWithdrawalResult
                                              .cardHolderName
                                          );
                                          resolve(response);
                                          this.cashwithdraw = false;
                                          this.balance_Enq = false;
                                          this.bn_eq = false;
                                          this.trn_dtl = true;
                                          // this.ngxSpinner.hide('matmsdkSpinner');
                                          Notiflix.Loading.remove();
                                        })
                                        .catch((sucErr : any) => {
                                          throw new Error(sucErr);
                                        });
                                    });
                                  }
                                }
                              })
                              .catch((err : any) => {
                                // showAlert("Error", err.statusDes?err.statusDes:"Some Problem Occoured", tempModalElem.options.alert);
                                // hideLoader()
                                console.log('execute');
                              });
                          } else if (type == 1) {
                            this.doBalanceEnquiry()
                              .then(() => {
                                console.log(this.doBalanceEnquiryResult);
                                if (this.doBalanceEnquiryResult.status == -1) {
                                  reject('Error while processing request');
                                } else if (
                                  this.doBalanceEnquiryResult.status == 0
                                ) {
                                  let parsed = JSON.parse(
                                    this.doBalanceEnquiryResult.statusDes
                                  );
                                  if (parsed['39'].substr(2) == '00') {
                                    this.set8A(parsed['39']);
                                    this.set89(parsed['38']);
                                    this.set031E(parsed['55']);
                                    this.set0308('00');
                                    this.completeTransaction().then((data : any) => {
                                      console.log(data);
                                      this.data_tran = data;
                                      console.log(this.data_tran.msg);
                                      this.completeTransactionISU(
                                        this.data_tran.msg,
                                        this.doBalanceEnquiryResult.txnId
                                      )
                                        .then((sucResult : any) => {
                                          let parsedDesc = JSON.parse(
                                            this.doBalanceEnquiryResult
                                              .statusDes
                                          );
                                          const response = this.parseResponse(
                                            parsedDesc,
                                            this.doBalanceEnquiryResult.txnId,
                                            this.doBalanceEnquiryResult
                                              .txn_card_type,
                                            this.doBalanceEnquiryResult
                                              .cardHolderName
                                          );
                                          resolve(response);
                                          this.cashwithdraw = false;
                                          this.balance_Enq = false;
                                          this.bn_eq = true;
                                          this.trn_dtl = true;
                                          // this.ngxSpinner.hide('matmsdkSpinner');
                                          Notiflix.Loading.remove();
                                        })
                                        .catch((sucErr : any) => {
                                          throw new Error(sucErr);
                                        });
                                    });
                                  } else {
                                    this.set8A(parsed['39']);
                                    this.set89(parsed['38']);
                                    this.set031E(this.deviceData);
                                    this.set0308('00');
                                    this.completeTransaction().then((data : any) => {
                                      console.log(data);
                                      this.data_tran = data;
                                      console.log(this.data_tran.msg);
                                      this.completeTransactionISU(
                                        this.data_tran.msg,
                                        this.doBalanceEnquiryResult.txnId
                                      )
                                        .then((sucResult : any) => {
                                          let parsedDesc = JSON.parse(
                                            this.doBalanceEnquiryResult
                                              .statusDes
                                          );
                                          const response = this.parseResponse(
                                            parsedDesc,
                                            this.doBalanceEnquiryResult.txnId,
                                            this.doBalanceEnquiryResult
                                              .txn_card_type,
                                            this.doBalanceEnquiryResult
                                              .cardHolderName
                                          );
                                          resolve(response);
                                          this.cashwithdraw = false;
                                          this.balance_Enq = false;
                                          this.trn_dtl = true;
                                          this.bn_eq = true;
                                          // this.ngxSpinner.hide('matmsdkSpinner');
                                          Notiflix.Loading.remove();
                                        })
                                        .catch((sucErr : any) => {
                                          throw new Error(sucErr);
                                        });
                                    });
                                  }
                                }
                              })
                              .catch((err : any) => {
                                console.log(err);
                                // this.ngxSpinner.hide('matmsdkSpinner');
                                Notiflix.Loading.remove();
                                Notiflix.Notify.warning('Error !!! Try Again', {
                                  timeout : 2000,
                                  clickToClose : true,
                                  closeButton : true,
                                });
                                // showAlert(
                                // 	"Error",
                                // 	err.statusDes
                                // );
                                // hideLoader();
                              });
                          }
                        });
                    }
                  });
                }
              });
            })
            .catch((err : any) => {
              console.log(err);
              // showAlert(
              // 	"Error",
              // 	err.msg ? err.msg : err
              // );
              // hideLoader();
              // throw new Error(err);
            });
        });
      }
    });
  };
  doBalanceEnquiry = () => {
    console.log('Balance enquiry API called', this.paramA);
    this.transactionType = 'BALANCE ENQUIRY';
    return new Promise<void>(async (resolve, reject) => {
      // const encUrl = await AuthConfig.config.encodeUrl(`${this.matmBaseUrl}/doBalanceInquiry`);
      const obj = {
        pansn : this.pansn,
        amount : this.generateTxnAmount(0),
        trackData : this.trackData,
        deviceSerial : this.deviceSlNo,
        pinblock : this.pinBlock,
        deviceData : this.deviceData + '9F0306' + this.generateTxnAmount(0),
        transactionType : '31',
        isFallback : 'no',
        txn_card_type : '',
        txnLatitude : this.lat,
        txnLongitude : this.long,
        paramA : this.paramA || '',
        clientRefId: sessionStorage.getItem('clientRefId'),
        // paramB: this.paramB || "",
        paramB : '',
        paramC : '',
        retailer : this.userName,
        isSL : false,
        timestamp : this.datetime,
        cardHolderName : this.cardHolderName,
        clientInfo :
          '{"deviceType":"PAX D180","platformType":"WEBUSER","mobileNo":"' +
          this.paramC +
          '","deviceSerialNo":"' +
          this.deviceSlNo +
          '","deviceVersion":"' +
          this.appService.deviceVersion +
          '","AppVersion":"1.0.0.4"}',
      };
      axios
        .post(`${this.matmBaseUrl}/doBalanceInquiryForSdk`, obj, {
          headers : {
            'Content-Type' : 'application/json',
            Client_id : this.clientId,
            Client_Secret : this.Client_Secret,
            // apiusername: apiusername
            UserSourceAgent : 'ANDROIDSDK'
          },
          transformResponse : (data : any) => JSONBigint.parse(data),
        })
        .then((response : any) => {
          console.log(response);
          if (response.data.status == 0) {
            this.doBalanceEnquiryResult = response.data;
            this.remarkstatus = response.data.statusCode;
            resolve();
          } else if (response.data.status == -1) {
            Notiflix.Report.failure(response.data.statusDes, '', 'ok');
            Notiflix.Loading.remove();
          } else {
            reject(response.data);
          }
        })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  doCashWithdrawal = (packet : any) => {
    console.log('Balance withdrawal API called');
    this.transactionType = 'CASH WITHDRAWAL';
    this.wdAmt = packet.amount;
    console.log(this.wdAmt);
    return new Promise<void>(async (resolve, reject) => {
      const obj = {
        pansn : this.pansn,
        amount : this.generateTxnAmount(this.wdAmt),
        trackData : this.trackData,
        deviceSerial : this.deviceSlNo,
        pinblock : this.pinBlock,
        deviceData : this.deviceData + '9F0306' + this.generateTxnAmount(0),
        transactionType : '01',
        isFallback : 'no',
        txn_card_type : '',
        txnLatitude : this.lat,
        txnLongitude : this.long,
        paramA : this.paramA || '',
        paramB : '',
        paramC : '',
        retailer : this.userName,
        isSL : false,
        timestamp : this.datetime,
        cardHolderName : this.hex_to_ascii(this.get5F20Data()),
        clientInfo :
          '{"deviceType":"PAX D180","platformType":"WEBUSER","mobileNo":"' +
          this.paramC +
          '","deviceSerialNo":"' +
          this.deviceSlNo +
          '","deviceVersion":"' +
          this.appService.deviceVersion +
          '","AppVersion":"1.0.0.4"}',
      };

      axios.post(`${this.matmBaseUrl}/doCashWithdralForSdk`, obj, {
        headers : {
          'Content-Type' : 'application/json',
          Client_id : this.clientId,
          Client_Secret : this.Client_Secret,
          // apiusername: apiusername
          UserSourceAgent : 'ANDROIDSDK'
        },
        transformResponse : (data : any) => JSONBigint.parse(data),
      })
        .then((result : any) => {
          if (result.data.status == 0) {
            this.doCashWithdrawalResult = result.data;
            this.remarkstatus = result.data.statusCode;
            console.log(this.doCashWithdrawalResult, '!!1151');
            resolve();
          } else if (result.data.status == -1) {
            Notiflix.Report.failure(result.data.statusDes, '', 'ok');
            Notiflix.Loading.remove();
          } else {
            reject(result.data);
          }
        })
        .catch((err : any) => {
          console.log(err);
          Notiflix.Report.failure('Some Problem Occurred', '', 'ok');
          reject(err);
        });
    });
  };
  get5F20Data = () => {
    return new Promise<void>((resolve, reject) => {
      console.log('getting 5f20 data...');
      const tag = '5f20';
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=TRANSACTION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          console.log(data);
          if (data.code == 0) {
            this.cardHolderName = this.hex_to_ascii(data.data.substr(10));
            console.log(this.cardHolderName);
            resolve();
          } else {
            console.log('else block ');
            console.log(data);
            reject();
          }
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };
  getPinBlock = () => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Getting pin block...`);
      const tag = `0316`;
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=CONFIGURATION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.pinBlock = data.data.substr(10);
            console.log(this.pinBlock);
            console.log(this.pinBlock.length, 'Length');

            if (this.pinBlock.length) {
              resolve();
            } else {
              // this.ngxSpinner.hide('matmsdkSpinner');
              Notiflix.Loading.remove();
              // vex.dialog.alert();
              Notiflix.Report.failure(
                'Something Went Wrong,Insert Card and Enter Pin Again.',
                '',
                'ok'
              );
              // reject();
            }
          } else {
            console.log(`Get device data error!`, data);
            reject();
          }
        })
        .catch((err : any) => {
          console.log(`Get device data error!`, err);
          reject();
        });
    });
  };
  getTxnResult = () => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Getting transaction result...`);
      const tag = `031B`;
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=CONFIGURATION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            if (data.data.substr(10) === '02') {
              this.txnResult = true;
              resolve();
            } else {
              console.log('Transaction result failed!');
              reject();
            }
            //Success
          } else {
            console.log(`Get Txn result error!`, data);
            reject();
            //Conditional success
          }
        })
        .catch((err : any) => {
          console.log(`Get Txn result error!`, err);
          reject();
        });
    });
  };
  getTrackData = () => {
    return new Promise((resolve, reject) => {
      console.log('Getting track data ...');
      const tag = `57`;
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=TRANSACTION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            //Success
            this.trackData = data.data.substr(8);
            // console.log(data);
            resolve(data);
          } else {
            resolve(data);
            //Conditional success
          }
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };
  getDeviceData = () => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Getting device data...`);
      // const tag = `8284959F029B9F269A9C5F2A9F339F1A9F1E9F279F369F379F349F10`;
      const tag = `8284959F029B9F269A9C5F2A9F339F1A9F1E9F279F369F379F349F10`;
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=TRANSACTION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.deviceData = data.data.substr(4);
            resolve();
          } else {
            console.log(`Get device data error!`, data);
            reject();
          }
        })
        .catch((err : any) => {
          console.log(`Get device data error!`, err);
          reject();
        });
    });
  };
  get5F34data = () => {
    return new Promise<void>((resolve, reject) => {
      console.log('getting 5f34 data...');
      const tag = '5F34';
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=TRANSACTION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          console.log(data);
          if (data.code == 0) {
            this.panserialno = data.data.substr(6);
            console.log(this.panserialno);
            if (this.panserialno.includes('00')) {
              this.pansn = '0';
            } else if (this.panserialno.includes('03')) {
              this.pansn = '3';
            } else if (this.panserialno.includes('15')) {
              this.pansn = '15';
            } else {
              this.pansn = '1';
            }
            resolve();
          } else {
            console.log('else block ');
            console.log(data);
            reject();
          }
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };
  getCardType = () => {
    return new Promise((resolve, reject) => {
      console.log(`Getting card type...`);
      const tag = `0301`;
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=CONFIGURATION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            resolve(data);
          } else {
            console.log('Card type error!', data);
            reject();
          }
        })
        .catch((err : any) => {
          console.log(`Card type error!`, err);
          reject();
        });
    });
  };
  startTransaction = () => {
    return new Promise((resolve, reject) => {
      console.log('Starting transaction...');
      // this.ngxSpinner.hide('matmsdkSpinner');
      Notiflix.Loading.remove();
      this.activ = 1;
      fetch(`${this.paxBaseUrl}/startTransaction`)
        .then((result) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            // hideAlert();
            this.activ = 0;
            resolve(data);
            //Success
          } else {
            reject(data);
            this.activ = 0;
            // vex.dialog.alert(data.msg);
            Notiflix.Report.failure(data.msg, '', 'ok');
            // hideAlert();
            //Conditional success
          }
        })
        .catch((err : any) => {
          reject(`Start transaction error!`);
        });
    });
  };
  setTxnData = () => {
    return new Promise((resolve, reject) => {
      console.log('Setting transaction data...');
      let type, amount;
      if (this.operation === 'CW') {
        type = '01';
        amount = this.amount;
      }
      if (this.operation === 'BE') {
        type = '31';
        amount = 0;
      }
      // const txnAmountTLV = "9F0206" + this.generateTxnAmount(amount); For Cash W/d
      const txnAmountTLV = '9F0206' + this.generateTxnAmount(amount);

      const txnTypeTLV = `9C01${type}`;
      const txnCurrCodeTLV = `5F2A020356`;
      const txnCurrExpTLV = `5F360102`;
      const txnDate = this.fetchTxnDate();
      const txnTime = this.fetchTxnTime();

      // const concatTLV = `${txnAmountTLV}${txnTypeTLV}${txnCurrCodeTLV}${txnCurrExpTLV}9A03${txnDate}9F2103${txnTime}`;
      const concatTLV = `${txnAmountTLV}${txnTypeTLV}${txnCurrCodeTLV}${txnCurrExpTLV}`;
      fetch(
        `${this.paxBaseUrl}/setData/1?datatype=TRANSACTION_DATA&tlvData=${concatTLV}`,
        { method : 'post' }
      )
        .then((result) => result.json())
        .then((data : any) => {

          resolve(data);

        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };

  isConnected() {
    return new Promise<void>((resolve, reject) => {
      // console.log("Checking device connection...");
      fetch(`${this.paxBaseUrl}/isConnected`)
        .then((result) => result.json())
        .then((data : any) => {
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
        .catch((err : any) => {
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

  intiateBalanceEnquiry(biInfo : any) {
    this.usr_mbNo = biInfo.userMob;
    this.messagePin = false;
    this.transactionTypeData = 31;
    if (biInfo.device === 'D180') {
      Notiflix.Loading.hourglass();
      this.isConnected();
      if (this.transactionTypeData != 1 && this.transactionTypeData) {
        this.initiateBalanceEnquiry(this.usr_mbNo)
          .then((sucess : any) => {
            this.showReceipt(sucess, this.transactionTypeData);
          })
          .catch((err : any) => {
            console.log(err);
          });
      }
    } else if (biInfo.device === 'MP63') {
      this.checkDvcConnection();
      if (this.transactionTypeData != 1 && this.transactionTypeData) {
        this.initiateMorfunbalanceEnquiry(this.usr_mbNo)
          .then((sucess : any) => {
            this.showReceipt(sucess, this.transactionTypeData);
          })
          .catch((err : any) => {
            console.log(err);
          });
      }
    }
  }

  initiateBalanceEnquiry = (mobNo : any) => {

    return new Promise((resolve, reject) => {
      if (this.isInitialized) {
        this.operation = 'BE';
        this.paramC = mobNo;
        this.initiateProcess({ type : 1, userName : this.paramA, amount : 0 })
          .then((result) => {
            console.log(result);
            resolve(result);
          })
          .catch((err : any) => {
            throw new Error(err);
          });
      } else {
        // this.ngxSpinner.hide('matmsdkSpinner');
        Notiflix.Loading.remove();
        console.log('SDK initializing failed!');
      }
    });
  };
  checkDvcConnection = () => {
    return new Promise((resolve, reject) => {
      console.log('Check Device connection...');
      fetch(`${this.morefunBaseUrl}/is_device_connected`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin' : '*',
        },
      })
        .then((result) => resolve(result))
        // .then((data) => {
        //   console.log(data);
        //   // if()
        // })
        .catch((err) => {
          console.log(err);
          reject();
        });
    });
  };
  domorefunBalanceEnquiry = (mobno : any) => {
    console.log('Balance enquiry API called');
    this.transactionType = 'BALANCE ENQUIRY';
    this.paramC = mobno;
    return new Promise<void>(async (resolve, reject) => {
      // const encUrl = await AuthConfig.config.encodeUrl(`${this.matmBaseUrl}/doBalanceInquiry`);
      const obj = {
        pansn : this.morefunPansn,
        amount : this.generateTxnAmount(0),
        trackData : this.track2dataMorefun,
        deviceSerial : this.appService.morefunDvc_serial,
        pinblock : this.morefunpinBlock,
        deviceData : this.finalIcData,
        transactionType : '31',
        isFallback : 'no',
        txn_card_type : '',
        txnLatitude : this.lat,
        txnLongitude : this.long,
        clientRefId: sessionStorage.getItem('clientRefId'),
        paramA : this.paramA,
        // paramB: this.paramB || "",
        paramB : '',
        paramC : '',
        retailer : this.userName,
        isSL : false,
        timestamp : this.datetime,
        cardHolderName : this.cardHolderName,
        clientInfo :
          '{"deviceType":"MoreFun Mp63","platformType":"WEBUSER","mobileNo":"' +
          this.paramC +
          '","deviceSerialNo":"' +
          this.appService.morefunDvc_serial +
          '","deviceVersion":"' +
          this.appService.deviceVersion +
          '","AppVersion":"1.0.0.4"}',
      };
      axios
        .post(`${this.matmBaseUrl}/doBalanceInquiryForSdk`, obj, {
          headers : {
            'Content-Type' : 'application/json',
            Client_id : this.clientId,
            Client_Secret : this.Client_Secret,
            // apiusername: apiusername
            UserSourceAgent : 'ANDROIDSDK'
          },
          transformResponse : (data) => JSONBigint.parse(data),
        })
        .then((response : any) => {
          console.log(response);
          if (response.data.status == 0) {
            this.doBalanceEnquiryResult = response.data;
            this.remarkstatus = response.data.statusCode;
            resolve(response.data);
          } else if (response.data.status == -1) {
            Notiflix.Report.failure(response.data.statusDes, '', 'ok');
            Notiflix.Loading.remove();
          } else {
            reject(response.data);
          }
        })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });

  };
  initiateMorfunbalanceEnquiry = (mobno : any) => {
    return new Promise((resolve, reject) => {
      this.read_card(0).then((data : any) => {
        this.getDateAndTime().then(() => {
          this.domorefunBalanceEnquiry(mobno).then(() => {
            console.log(this.doBalanceEnquiryResult);
            if (this.doBalanceEnquiryResult.status == -1) {
              reject('Error while processing request');
            } else if (this.doBalanceEnquiryResult.status == 0) {
              let parsed = JSON.parse(this.doBalanceEnquiryResult.statusDes);
              if (parsed['39'] == '0000') {
                this.completestatusId = 'APPROVED';
              } else {
                this.completestatusId = 'DECLINE';
              }
              console.log(this.completestatusId);
              console.log(parsed['55']);
              this.onlineAuthmorefun(parsed['55']).then((data) => {
                console.log(data);
                this.completeTransactionISU(
                  this.completestatusId,
                  this.doBalanceEnquiryResult.txnId
                )
                  .then((succresponse : any) => {
                    const response = this.parseResponse(
                      parsed,
                      this.doBalanceEnquiryResult.txnId,
                      this.doBalanceEnquiryResult.txn_card_type,
                      this.doBalanceEnquiryResult.cardHolderName
                    );
                    resolve(response);
                    this.cashwithdraw = false;
                    this.balance_Enq = false;
                    this.trn_dtl = true;
                    this.bn_eq = true;
                    Notiflix.Loading.remove();
                  })
                  .catch((sucErr) => {
                    throw new Error(sucErr);
                  });
              });
            }
          });
        });
      });
    });
  };
}
