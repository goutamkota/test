import { Component, EventEmitter, inject, Input, Output, ViewChild } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from "@angular/forms";
import { AppService } from "../../app.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";

@Component({
  selector : 'app-cashwithdrawal',
  standalone : true,
  imports : [
    ReactiveFormsModule,
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl : './cashwithdrawal.component.html',
  styleUrl : './cashwithdrawal.component.scss'
})
export class CashwithdrawalComponent {
  @ViewChild('modalDefault', { static : false }) private VPAModal : any;
  @Input() matm_amntform! : FormGroup;
  @Output() intiateCashWithdrawal : EventEmitter<any> = new EventEmitter();
  @Input() insrtcard : any;
  @Input() deviceUsed! : string;
  public appService : AppService = inject(AppService);

  transactionbadge! : string[];
  val = 0;
  value : any = '';
  selected_cw_amnt : any = null;
  usr_mbNo : any;
  transactionTypeData! : number;
  myamount : any;

  ngOnInit() : void {
    this.transactionbadge = ['100', '500', '1000', '1500', '2500', '5000'];
  }

  badgeValue(transvalue : any) {
    this.val = transvalue;
    this.value = transvalue;
    this.matm_amntform?.get('amountSelect')?.setValue(this.value);
  }

  showtrandetail() {
    let validamt = this.matm_amntform?.get('amountSelect')?.value;
    this.usr_mbNo = this.matm_amntform?.get('mobilenum')?.value;
    this.transactionTypeData = 1;
    this.myamount = validamt;
    this.intiateCashWithdrawal.emit({
      amount : this.myamount,
      userMob : this.usr_mbNo,
      device : this.deviceUsed,
    });
    console.log('lol', this.deviceUsed)
    if (this.deviceUsed === 'D180') {
      this.appService.isConnected();
      console.log(this.myamount, 'WD Ammount');
      if (
        this.transactionTypeData == 1 &&
        this.myamount >= 100 &&
        this.transactionTypeData
      ) {
        this.intiateCashWithdrawal.emit({
          amount : this.myamount,
          userMob : this.usr_mbNo,
          device : this.deviceUsed,
        });
      }
    } else if (this.deviceUsed === 'MP63') {

      if (
        this.transactionTypeData == 1 &&
        this.myamount >= 100 &&
        this.transactionTypeData
      ) {
        this.intiateCashWithdrawal.emit({
          amount : this.myamount,
          userMob : this.usr_mbNo,
          device : this.deviceUsed,
        });
      }
    }
  }

  trackByIndex(index : number, amount : any) : any {
    return amount;
  }

  currentSelectedAmount(amount : string) {
    this.selected_cw_amnt = amount;
    this.matm_amntform.patchValue({
      amountSelect : amount,
    });
  }

  golocalHost() {
    window.open('https://127.0.0.1:14000', '_blank');
    this.VPAModal.hide();
  }
}
