
export class Utilities {
  cashwithdraw: boolean = true;
  balance_Enq!: boolean;
  transactionbadge!: string[];
  value: any = '';
  trn_dtl: boolean = false;
  activ: number | null | undefined;
  messagePin!: boolean;
  deviceSlNo: any;
  userName: any;
  token: any;
  key_tpk: any;
  dvcrdy: boolean = true;
  operation: string | null | undefined;
  paxBaseUrl: string | null | undefined;
  morefunBaseUrl: string | null | undefined;
  txnResult!: boolean;
  deviceData: any;
  trackData: any;
  pinBlock: any;
  transactionType: string | null | undefined;
  lat: string | number | null | undefined;
  long: string | number | null | undefined;
  matmBaseUrl: string | null | undefined;
  set8AResult: any;
  doBalanceEnquiryResult: any;
  set89Result: any;
  set031EResult: any;
  paramC: any;
  isInitialized!: boolean;
  paramA: any;
  paramB: any;
  doCashWithdrawalResult: any;
  transactionTypeData: number | null | undefined;
  token1: any;
  key: any;
  txn_ID: any;
  data_tran: any;
  data_msg: any;
  BALANCE_amt: number | null | undefined;
  transaction_Data: any;
  enqbalance: any;
  Transaction_ID: any;
  Transaction_time: any;
  bn_eq!: boolean;
  insrtcard: boolean = true;
  printBtn: HTMLElement | null = null;
  cardnumber: any;
  txStatus: any;
  rrn: any;
  TID: any;
  cbalance: any;
  MID: any;
  remarks: any;
  mobileNum1: any;
  tran_TYpe: any;
  docDefinition: any;
  myamount: any;
  amount: any;
  wdAmt: any;
  failcase!: boolean;
  data1: any;
  txnId: any;
  status_check!: boolean;
  txn_Date: any;
  datetime: string | null | undefined;
  set0308Result: any;
  cardHolderName: string | null | undefined;
  val = 0;
  statColor: any;
  validamt: any;
  statusReport: any;
  txnStatus: any;
  newStrstatus: any;
  usr_mbNo: any;
  userData: any;
  brand: any;
  shopname: any;
  opperformed: string | null | undefined;
  tran_amt: any;
  deviceVersion: string | null | undefined;
  panserialno: any;
  pansn: any;
  remarkstatus: any;
  // Image Binding

  succImage = ('../../../../assets/images/unifiedmatm/success.svg');
  failImage = ('../../../../assets/images/unifiedmatm/failcase.png');
  insertcardImage = ('../../../../assets/images/unifiedmatm/insertcard.png');
  insertImage = ('../../../../assets/images/unifiedmatm/insert.svg');
  iconImage = ('../../../../assets/images/unifiedmatm/icon.png');
  demo2: any;
  demo3: any;
  select_dvc: boolean = false;
  devices = [
    {
      id: 'D180',
      name: 'PAX D180',
      img: ('../../../../assets/images/unifiedmatm/pax.png'),
      showTick: false,
    },
    {
      id: 'MP63',
      name: 'MORFUN MP63',
      img: ('../../../../assets/images/unifiedmatm/morefun233.png'),
      showTick: false,
    },
  ];
  deviceUsed: any;
  device_data: any = [];
  deviceList: any;
  selectedFile: File | null = null;
  track2dataMorefun: any;
  pansnMorefun: any;
  icDatamoreFun: any;
  finalIcData: string | null | undefined;
  morefunpinBlock: any;
  morefunDvc_serial: any;
  morefunPansn: string | null | undefined;
  BalanceEnquiryResult: void | null = null;
  tempinput!: boolean;
  avlble_device: any;
  mAdress_MP: any;
  emvTranSaction: number | null | undefined;
  trans_mf_name: string | null | undefined;
  amountMF: string | null | undefined;
  finalIcModifyBE: string | null | undefined;
  completestatusId!: string;
  client_IP: any;
  dashboardData: any;
  arrow_mark: any;
  statusPage!: string | null | undefined;
  clientId: string | null | undefined;
  Client_Secret: string | null | undefined;
  apiusername!: string | null | undefined;


  constructor() {
    this.clientId = sessionStorage.getItem('clientId');
    this.Client_Secret = sessionStorage.getItem('clientSecret');
    this.apiusername = sessionStorage.getItem('apiusername');
  }
}
