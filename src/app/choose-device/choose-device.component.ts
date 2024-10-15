import { Component, inject, ViewChild } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import * as Notiflix from 'notiflix';
import { HttpClient } from '@angular/common/http';
import { AuthConfig } from "../app-config";
import { AppService } from "../app.service";

@Component({
  selector : 'app-choose-device',
  standalone : true,
  imports : [
    RouterLink
  ],
  templateUrl : './choose-device.component.html',
  styleUrl : './choose-device.component.scss'
})
export class ChooseDeviceComponent {
  private appService = inject(AppService);
  selected! : boolean;
  pax : string = 'https://storage.googleapis.com/micro-services-frontend/dist/assets/matm-assets/paxD180.png';
  morefun : string = 'https://storage.googleapis.com/micro-services-frontend/dist/assets/matm-assets/moreFun.png'

  private http = inject(HttpClient)
  private router = inject(Router)
  @ViewChild('modalDefault', { static : false }) private VPAModal : any;
  clientId : any;
  isInitialized! : boolean;
  deviceSlNo : any;
  Client_Secret : any;
  deviceUsed : any;
  transactionbadge = ['100', '500', '1000', '1500', '2500', '5000'];
  paxBaseUrl = 'https://127.0.0.1:14000/easyLinkSdkManager'; //Pax D180 Base URl
  morefunBaseUrl = 'http://localhost:16000/mp63'; // Morefun MP 63 base URl
  matmBaseUrl = 'https://apidev-sdk.iserveu.online/staging/mATMV2'; //stage Url
  userName : any;
  paramA : any;
  token : any;
  brand : any;
  shopname : any;
  dashboardData : any;
  demo2 = ('../../../../assets/images/unifiedmatm/csc_logo.png');
  demo3 = ('../../../../assets/images/unifiedmatm/digipay-lite.png');
  arrow_mark = ('../../../../assets/images/unifiedmatm/right-arrow.svg');
  tempinput! : boolean;
  errorCodes = {
    '00' : 'Approved or completed Successfully',
    '03' : 'Invalid merchant.',
    '04' : 'Pick-up.',
    '05' : 'Do not honour. In case CVD, CVD2, iCVD verification fails, Inactive or Dormant account',
    '06' : 'Error',
    12 : 'Invalid transaction or if member is not able to find any appropriate response code',
    13 : 'Invalid amount.',
    14 : 'Invalid card number (no such Number).',
    15 : 'No such issuer.',
    17 : 'Customer cancellation.',
    20 : 'Invalid response.',
    21 : 'No action taken.',
    22 : 'Suspected malfunction.',
    25 : 'Unable to locate record',
    27 : 'File Update field edit error',
    28 : 'Record already exist in the file',
    29 : 'File Update not successful',
    30 : 'Format error.',
    31 : 'Bank not supported by Switch',
    33 : 'Expired card, capture',
    34 : 'Suspected fraud, capture.',
    36 : 'Restricted card, capture',
    38 : 'Allowable PIN tries exceeded, capture.',
    39 : 'No credit account.',
    40 : 'Requested function not supported.',
    41 : 'Lost card, capture.',
    42 : 'No universal account.',
    43 : 'Stolen card, capture.',
    51 : 'Not sufficient funds.',
    52 : 'No checking account',
    53 : 'No savings account.',
    54 : 'Expired card, decline',
    55 : 'Incorrect personal identification number.',
    56 : 'No card record.',
    57 : 'Transaction not permitted to Cardholder',
    58 : 'Transaction not permitted to terminal.',
    59 : 'Suspected fraud, decline / Transactions declined based on Risk Score',
    60 : 'Card acceptor contact acquirer, decline.',
    61 : 'Exceeds withdrawal amount limit.',
    62 : 'Restricted card, decline.',
    63 : 'Security violation.',
    65 : 'Exceeds withdrawal frequency limit.',
    66 : 'Card acceptor calls acquirer’s.',
    67 : 'Hard capture (requires that card be picked up at ATM)',
    68 : 'Acquirer time-out',
    69 : 'Mobile number record not found/ mis-match',
    71 : 'Deemed Acceptance',
    74 : 'Transactions declined by Issuer based on Risk Score',
    75 : 'Allowable number of PIN tries exceeded, decline',
    81 : 'Cryptographic Error',
    90 : 'Cut-off is in process.',
    91 : 'Issuer or switch is inoperative',
    92 : 'No routing available',
    93 : 'Transaction cannot be completed. Compliance violation.',
    94 : 'Duplicate transmission.',
    95 : 'Reconcile error',
    96 : 'System malfunction',
    E3 : 'ARQC validation failed by Issuer',
    E4 : 'TVR validation failed by Issuer',
    E5 : 'CVR validation failed by Issuer',
    MU : 'No Aadhar linked to Card',
    UG : 'INVALID BIOMETRIC DATA',
    U3 : 'BIOMETRIC DATA DID NOT MATCH',
    WZ : 'Technical Decline UIDAI',
    CA : 'Compliance error code for acquirer',
    CI : 'Compliance error code for issuer',
  };
  select_dvc : boolean = false;
  dvcrdy : boolean = true;
  key : any;

  constructor() {
    this.userName = sessionStorage.getItem('username');
    this.paramA = sessionStorage.getItem('clientRefId');
    this.token = sessionStorage.getItem('CORE_SESSION');
    this.brand = localStorage.getItem('brand_name');
    this.shopname = localStorage.getItem('shop_name');
    this.dashboardData = JSON.parse(sessionStorage.getItem('dashboardData') as string);
    this.clientId = sessionStorage.getItem('clientId');
    this.Client_Secret = sessionStorage.getItem('clientSecret')
  }

  onChooseDevice(id : any, bool : boolean) {
    this.selected = bool;
    console.log(id);
    this.dvcrdy = true;
    this.appService.insrtcard = true;
    this.deviceUsed = id;
    if (this.deviceUsed == 'MP63') {
      this.tempinput = false;
    }
  }
  matmdvc_Conn() {
    if (this.deviceUsed === 'D180') {
      Notiflix.Loading.hourglass();
      this.isConnected().then(this.connectDevice);
    } else if (this.deviceUsed === 'MP63') {
      Notiflix.Loading.hourglass();
      this.setConnectionMode()
        .then(this.mp63Con_Device)
        .then(this.deviceInfo)
        .then(this.checkDeviceMappingMP63)
        .then(this.verifyVendor)
        .then(this.callLoadMasterKey)
        .then(this.callLoadAid)
        .then(this.callLoadCApk)
        .then(this.setEMVparameter)
        .then(this.fetchmorefunKeys);
    } else {
      Notiflix.Notify.info('Please Choose an Device to Connect !!');
    }
  }
  // PaxD180 start
  isConnected() {
    return new Promise<void>((resolve, reject) => {
      fetch(`${this.paxBaseUrl}/isConnected`)
        .then((result : any) => result.json())
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
        });
    });
  }

  connectDevice = () => {
    return new Promise<void>((resolve, reject) => {
      console.log('Connecting device...');
      fetch(`${this.paxBaseUrl}/connectDevice/1?commtype=USB&connectTimeout=20`)
        .then((result : any) => result.json())
        .then((data : any) => {
          if (
            data.code == 0 ||
            data.code == 1001 ||
            data.msg === 'success' ||
            data.msg === 'Already Connected!'
          ) {
            this.device_config();
            resolve();
          } else {
            if (data.msg === 'Comm connect err') {
              reject();
              Notiflix.Loading.remove();
              Notiflix.Report.info(
                'Please check, if device is connected or not.',
                '',
                'Ok'
              );
              this.dvcrdy = true;
              this.select_dvc = false;
            }
          }
        })
        .catch((err : any) => {
          reject(`Device connection error!`);
        });
    });
  };

  //<<----Device Config ---->>
  device_config() {
    this.getDeviceSL();
    this.setConfigData();
  }

  // DeviceSl No And Map Check
  getDeviceSL() {
    return new Promise<void>((resolve, reject) => {
      console.log('Getting device serial no...');
      const tag = `0101`;
      fetch(
        `${this.paxBaseUrl}/getData/1?datatype=CONFIGURATION_DATA&tag=${tag}`,
        {
          method : 'post',
        }
      )
        .then((result : any) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.deviceSlNo = this.hex_to_ascii(data.data.substr(10));
            this.getVersionName();
            resolve();
          } else {
            reject(data);
          }
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  }

  getVersionName() {
    return new Promise<void>((resolve, reject) => {
      console.log('Getting device Version...');
      fetch(`${this.paxBaseUrl}/getVersionName`, {
        method : 'GET',
      })
        .then((result : any) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            this.appService.deviceVersion = data.data.substr(12);
            this.checkDeviceMapping();
            resolve();
          } else {
            reject(data);
          }
        })
        .catch((err : any) => {
          reject(err);
        });
    });

  };

  // <<--Check Devc-->>
  async checkDeviceMapping() {
    return new Promise(async (resolve, reject) => {
      console.log('Check Device API called');
      console.log('Checking device mapping...');
      const encUrl = await AuthConfig.config.encodeUrl(
        `${this.matmBaseUrl}/checkMapping`
      );
      fetch(encUrl, {
        method : 'POST',
        headers : {
          Accept : 'application/json',
          'Content-Type' : 'application/json',
          Client_id : this.clientId,
          Client_Secret : this.Client_Secret,
          UserSourceAgent : 'ANDROIDSDK'
        },
        body : JSON.stringify({
          userName : this.userName,
          deviceSlNo : this.deviceSlNo,
          bankName : 'others',
        }),
      })
        .then((result : any) => result.json())
        .then((data : any) => {
          if (data.status == 0) {
            console.log(`Device mapping success`);
            this.appService.insrtcard = false;
            this.injectKeys().then(() => {
              Notiflix.Loading.remove();
            });
          } else if (data.status == 1) {
            console.log(`Device mapping error`);
            Notiflix.Report.failure(data.desc, '', 'ok');
            reject(data.desc);
          } else if (data.status == -1) {
            console.log(`Device mapping error`);
            Notiflix.Loading.remove();
            Notiflix.Report.failure(data.statusDesc, '', 'ok');
            reject(data.desc);
          }
        })
        .catch((err : any) => {
          Notiflix.Loading.remove();
          console.log(`Device mapping error`, err);
        });
    });
  }

  setConfigData() {
    return new Promise((resolve, reject) => {
      console.log(`Setting config data...`);
      const concatTLV = `0202010102050101020301200206012502040100020901010214010702070101`;
      fetch(
        `${this.paxBaseUrl}/setData/1?datatype=CONFIGURATION_DATA&tlvData=${concatTLV}`,
        { method : 'post' }
      )
        .then((result : any) => result.json())
        .then((data : any) => {
          resolve(data);
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };

  // PaxD180 end

  // MoreFun start
  mp63Con_Device = () => {
    return new Promise((resolve, reject) => {
      console.log('Device connection...');
      fetch(`${this.morefunBaseUrl}/connect_device?mAddress=`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
          'Access-Control-Allow-Origin' : '*',
        },
      })
        .then((result : any) => resolve(result))
        // .then((data:any) => {
        //   console.log(data);
        // })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  /* check connection */
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
        .then((result : any) => resolve(result))
        // .then((data:any) => {
        //   console.log(data);
        //   // if()
        // })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  deviceInfo = () => {
    return new Promise((resolve, reject) => {
      console.log('Check Device Info...');
      fetch(`${this.morefunBaseUrl}/device_info`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/x-www-form-urlencoded',
          'Access-Control-Allow-Origin' : '*',
        },
      })
        .then((result : any) => result.json())
        .then((data : any) => {
          console.log(data);
          if (data.data.sn.length) {
            var deviceSerialNumber = data.data.sn;
            this.appService.morefunDvc_serial = deviceSerialNumber.substr(6);
            resolve(data);
          } else {
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Device Connection Fail,try Again !!!');
            reject(data);
          }
        })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  // Internal APi to check Mapping
  checkDeviceMappingMP63 = () => {
    return new Promise(async (resolve, reject) => {
      console.log('Check Device API called');
      console.log('Checking device mapping...','morefun checkMapping');
      fetch(`${this.matmBaseUrl}/checkMapping`, {
        method : 'POST',
        headers : {
          Accept : '*/*',
          'Content-Type' : 'application/json',
          Authorization: sessionStorage?.getItem('ACCESS_TOKEN') as string,
        },
        body : JSON.stringify({
          userName : this.userName,
          deviceSlNo : this.appService.morefunDvc_serial,
          bankName : 'others',
        }),
      })
        .then((result : any) => result.json())
        .then((data : any) => {
          if (data.status == 0) {
            console.log(`Device mapping success`);
            this.appService.insrtcard = false;
            resolve(data);
          } else if (data.status == 1) {
            console.log(`Device mapping error`);
            // this.ngxSpinner.hide('matmsdkSpinner');
            Notiflix.Loading.remove();
            // vex.dialog.alert();
            Notiflix.Report.failure(data.desc, '', 'ok');
            reject(data.desc);
          } else if (data.status == -1) {
            console.log(`Device mapping error`);
            // this.ngxSpinner.hide('matmsdkSpinner');
            Notiflix.Loading.remove();
            // vex.dialog.alert(data.statusDesc);
            Notiflix.Report.failure(data.statusDesc, '', 'ok');
            reject(data.desc);
          }
        })
        .catch((err : any) => {
          // this.ngxSpinner.hide('matmsdkSpinner');
          Notiflix.Loading.remove();
          // Notiflix.Notify.info("Device Check Fail,Try Agin !!!")
          console.log(`Device mapping error`, err);
          // reject(`Device mapping error`);
        });
    });
  };
  verifyVendor = () => {
    return new Promise((resolve, reject) => {
      console.log('Sign Data...');
      let form_data = new FormData();
      form_data.append(
        'signData',
        'B2AD7F0C0F77803266B97629FBD4EB49942BD069D7AC8C49BE8FC8B869A7CD101FA24CFF69572CD1243EB62215A1760E9F13DEE4F51572739D2C807F60E2A59C0E02EF62B85C64D79F2443505E4BBB71D25C2001DCC96CC904901B5EFB9666D8995CDFA4011908E75B0B8F53CE6F85AD5AF6B564DAF3C73EE04EEEA0DFE44CDC0EB615C4630446CAA5609AC58A2D72C331E6CA6E6DC7D8B3E02F49742708A61C7860D9E44324A3FE90904F7235A59334C20784D5A166B2D48464DC21A85037510CEC11C801B2A47104122990E23D0094CFD0BA454B4FD0B6151FFAB205CAB79FB3B73D3B28F51F6789B946223ACCA0ED83BDF897771BAD804DEB34DBDEE9682A'
      );
      form_data.append(
        'plainData',
        '969b5b7084e1cc34a24add51cacd8e93bc23950235c5b908edfe88c398048c6c'
      );
      fetch(`${this.morefunBaseUrl}/verify_vendor`, {
        method : 'POST',
        body : form_data,
      })
        .then((result : any) => resolve(result))
        // .then((data:any) => {
        //   console.log(data);
        //   resolve(data)
        // })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  // Load The Master Key (TMK)
  callLoadMasterKey = () => {
    return new Promise((resolve, reject) => {
      console.log('Load MasterKey...');
      const obj : any = {
        key : '380D4A75FEDF5BC1B3799DF2583876BA',
        kcv : '5E353F55',
      };
      fetch(`${this.morefunBaseUrl}/load_master_key`, {
        method : 'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin' : '*',
        },
        body : JSON.stringify(obj),
      })
        .then((result : any) => resolve(result))
        // .then((data:any) => {
        //   console.log(data);
        // })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  callLoadAid = () => {
    return new Promise((resolve, reject) => {
      console.log('Load AID...');
      var aidList = [
        '9F0608A000000333010100DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        '9F0608A000000333010101DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        '9F0608A000000333010102DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        '9F0608A000000333010103DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //Visa
        '9F0607A0000000031010DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //Master
        '9F0607A0000000041010DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //Local Master
        '9F0607D4100000012010DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //Local Visa
        '9F0607D4100000011010DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //AMERICAN EXPRESS
        '9F0608A000000025010402DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //AMERICAN EXPRESS
        '9F0608A000000025010501DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //JCB
        '9F0607A0000000651010DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //D-PAS
        '9F0607A0000001523010DF0101009F08020020DF1105D84000A800DF1205D84004F800DF130500100000009F1B0400000000DF150400000000DF160199DF170199DF14039F3704DF1801019F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        //Rupay
        '9F0607A0000005241010DF0101009F08020002DF11050000000000DF12050000000000DF130500000000009F1B04000186A0DF14039F3704DF150400000000DF160105DF170100DF1801319F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
        '9F0608A000000524010101DF0101009F08020030DF11050000000000DF12050000000000DF130500000000009F1B04000186A0DF150400000000DF160100DF170100DF14039F3704DF1801319F7B06000000010000DF1906000000010000DF2006000000050000DF2106000000004000',
        '9F0607A0000005241011DF0101009F08020002DF11050000000000DF12050000000000DF130500000000009F1B04000186A0DF14039F3704DF150400000000DF160105DF170100DF1801319F7B06000000200000DF1906000000200000DF2006000002000000DF2106000000100000',
      ];
      fetch(`${this.morefunBaseUrl}/load_aid`, {
        method : 'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin' : '*',
        },
        body : JSON.stringify(aidList),
      })
        .then((result : any) => resolve(result))
        // .then((data:any) => {
        //   console.log(data);
        // })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  callLoadCApk = () => {
    return new Promise((resolve, reject) => {
      console.log('Load CAPK...');
      var capkList = [
        '9F0605A0000003339F220102DF050420211231DF060101DF070101DF028190A3767ABD1B6AA69D7F3FBF28C092DE9ED1E658BA5F0909AF7A1CCD907373B7210FDEB16287BA8E78E1529F443976FD27F991EC67D95E5F4E96B127CAB2396A94D6E45CDA44CA4C4867570D6B07542F8D4BF9FF97975DB9891515E66F525D2B3CBEB6D662BFB6C3F338E93B02142BFC44173A3764C56AADD202075B26DC2F9F7D7AE74BD7D00FD05EE430032663D27A57DF040103DF031403BB335A8549A03B87AB089D006F60852E4B8060',
        '9F0605A0000003339F220103DF050420221231DF060101DF070101DF0281B0B0627DEE87864F9C18C13B9A1F025448BF13C58380C91F4CEBA9F9BCB214FF8414E9B59D6ABA10F941C7331768F47B2127907D857FA39AAF8CE02045DD01619D689EE731C551159BE7EB2D51A372FF56B556E5CB2FDE36E23073A44CA215D6C26CA68847B388E39520E0026E62294B557D6470440CA0AEFC9438C923AEC9B2098D6D3A1AF5E8B1DE36F4B53040109D89B77CAFAF70C26C601ABDF59EEC0FDC8A99089140CD2E817E335175B03B7AA33DDF040103DF031487F0CD7C0E86F38F89A66F8C47071A8B88586F26',
        '9F0605A0000003339F220104DF050420221231DF060101DF070101DF0281F8BC853E6B5365E89E7EE9317C94B02D0ABB0DBD91C05A224A2554AA29ED9FCB9D86EB9CCBB322A57811F86188AAC7351C72BD9EF196C5A01ACEF7A4EB0D2AD63D9E6AC2E7836547CB1595C68BCBAFD0F6728760F3A7CA7B97301B7E0220184EFC4F653008D93CE098C0D93B45201096D1ADFF4CF1F9FC02AF759DA27CD6DFD6D789B099F16F378B6100334E63F3D35F3251A5EC78693731F5233519CDB380F5AB8C0F02728E91D469ABD0EAE0D93B1CC66CE127B29C7D77441A49D09FCA5D6D9762FC74C31BB506C8BAE3C79AD6C2578775B95956B5370D1D0519E37906B384736233251E8F09AD79DFBE2C6ABFADAC8E4D8624318C27DAF1DF040103DF0314F527081CF371DD7E1FD4FA414A665036E0F5E6E5',
      ];
      fetch(`${this.morefunBaseUrl}/load_capk`, {
        method : 'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin' : '*',
        },
        body : JSON.stringify(capkList),
      })
        .then((result : any) => resolve(result))
        // .then((data:any) => {
        //   console.log(data);
        // })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };
  // <--------- SET EMV Parameter------>>>
  setEMVparameter = () => {
    return new Promise((resolve, reject) => {
      console.log('Set EMV Parameter...');
      var emvParameter =
        '9F01063132333435369F40057000F0A0019F150230319F160F3132333435363738393031323334359F3901059F330360D0C89F1A0203569F1C0831323334353637389F3501225F2A0203565F3601029F3C0208409F3D01029F1E6D665F36306220205F365F3601029F660434000080';
      fetch(`${this.morefunBaseUrl}/load_emv_param?emvParam=${emvParameter}`, {
        method : 'GET',
        headers : {
          'Content-Type' : 'application/json',
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
  fetchmorefunKeys = () => {
    this.fetchKeys(this.appService.morefunDvc_serial).then((keyResult) => {
      this.key = keyResult;
      this.load_WORk_key(
        this.key.tpk,
        this.key.tdk,
        this.key.tdkKcv,
        this.key.tpkKcv
      );
    });
  };
  load_WORk_key = (tpk : any, tdk : any, tdkKcv : any, tpkKcv : any) => {
    return new Promise((resolve, reject) => {
      console.log('Load Work Key...');
      var workKey = {
        pinKey : tpk,
        tdkKey : tdk,
        pinKCV : tpkKcv + '00',
        tdkKcv : tdkKcv + '00',
      };
      fetch(`${this.morefunBaseUrl}/load_work_key`, {
        method : 'post',
        headers : {
          'Content-Type' : 'application/json;charset=utf-8',
          'Access-Control-Allow-Origin' : '*',
        },
        body : JSON.stringify(workKey),
      })
        .then((result : any) => result.json())
        .then((data : any) => {
          console.log(data,'random')
          if (data) {
            this.dvcrdy = false;
            this.select_dvc = true;
            this.appService.insrtcard = false;
            if (data.statusCode == 200) {
              this.router.navigateByUrl('/matm')
              this.appService.deviceUsed = 'MP63'
              Notiflix.Loading.remove();
              resolve(data);
            }
          }
          // console.log(data);
        })
        .catch((err : any) => {
          console.log(err);
          reject();
        });
    });
  };

  fetchKeys(deviceSlNo : any) {
    return new Promise(async (resolve, reject) => {
      const encUrl = await AuthConfig.config.encodeUrl(
        `${this.matmBaseUrl}/generateTPKandTDK/${deviceSlNo}/${this.userName}`
      );
      this.http
        .post(encUrl, {})
        .toPromise()
        .then((data : any) => {
          if (data) {
            resolve(data);
          } else {
            reject(data);
          }
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };

  injectKeys = () => {
    return new Promise<void>((resolve, reject) => {
      console.log(`Injecting TPK and TDK`);
      this.fetchKeys(this.deviceSlNo).then((keyResult) => {
        // console.log(keyResult);
        this.key = keyResult;
        this.setTPK(this.key.tpk)
          .then(() => {
            console.log('TPK Injected');
            this.setTDK(this.key.tdk)
              .then(() => {
                console.log('TDK Injected');
                this.select_dvc = true;
                this.dvcrdy = false;
                resolve();
              })
              .catch((err : any) => {
                reject(`Key Injection error!`);
              });
          })
          .catch((err : any) => {
            reject(`Key Injection error!`);
          });
      });
    });
  };
  setTDK = (key : any) => {
    return new Promise((resolve, reject) => {
      fetch(
        `${this.paxBaseUrl}/WriteTWK?srcKeyType=PED_TMK&srcKeyIndex=30&dstKeyType=PED_TDK&dstKeyIndex=37&dstKeyValue=${key}&checkMode=0&timeoutSeconds=20`,
        {
          method : 'post',
        }
      )
        .then((result) => result.json())
        .then((data) => {

          resolve(data);
          //Conditional success

        })
        .catch((err) => {
          reject(err);
        });
    });
  };
  setTPK = (key : any) => {
    return new Promise((resolve, reject) => {
      fetch(
        `${this.paxBaseUrl}/WriteTWK?srcKeyType=PED_TMK&srcKeyIndex=30&dstKeyType=PED_TPK&dstKeyIndex=32&dstKeyValue=${key}&checkMode=0&timeoutSeconds=20`,
        {
          method : 'post',
        }
      )
        .then((result : any) => result.json())
        .then((data : any) => {
          if (data.code == 0) {
            //Success
            resolve(data);
          } else {
            reject(data);
            //Conditional success
          }
        })
        .catch((err : any) => {
          reject(err);
        });
    });
  };
  setConnectionMode = () => {
    return new Promise((resolve, reject) => {
      console.log('Checking device connection...');
      fetch(
        `${this.morefunBaseUrl}/request_connection_mode?connectionMode=HID&vendorId=16`,
        {
          method : 'GET',
          headers : {
            'Content-Type' : 'application/json',
            'Access-Control-Allow-Origin' : '*',
          },
        }
      )
        .then((result) => resolve(result))
        .catch((err) => {
          console.log(err);
          Notiflix.Loading.remove();
          Notiflix.Report.info(
            'Please check, if device is connected or not.',
            '',
            'Ok'
          );
          reject();
        });
    });
  };
  // MoreFun end
  hex_to_ascii = (str1 : any) => {
    var hex = str1.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  };
}
