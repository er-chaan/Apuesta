import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { CheckoutService } from 'paytm-blink-checkout-angular';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router'

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  userObj: any;
  modalRef: BsModalRef;
  checkoutData: any = {};
  private subs: Subscription;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService,
    private readonly checkoutService: CheckoutService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  notifyMerchantHandler = (eventType, data): void => {
    console.log('MERCHANT NOTIFY LOG', eventType, data);
    // alert();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  callbackStatus: any;
  callbackResponse: any;
  ngOnInit(): void {
    this.callbackStatus = this.route.snapshot.paramMap.get('status');
    this.callbackResponse = this.route.snapshot.paramMap.get('response');
    if (this.callbackStatus == "TXN_SUCCESS") {
      this.toastr.success(this.callbackResponse);
      setTimeout(() => {
        this.router.navigate(['/wallet']);
      }, 1000);
    }
    if (this.callbackStatus == "TXN_FAILURE") {
      this.toastr.error(this.callbackResponse);
      setTimeout(() => {
        this.router.navigate(['/wallet']);
      }, 1000);
    }

    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    this.getUserByEmail();

  }

  checkoutBlink() {
    this.checkoutService.init(
      //config
      {
        data: this.checkoutData,
        merchant: {
          // mid: "Iubljd78094283397763", //PROD
          mid: "lysWwv61149251509055",
          name: "el-Apuesta",
          redirect: true
        },
        flow: "DEFAULT",
        handler: {
          notifyMerchant: this.notifyMerchantHandler
        }
      },
      //options
      {
        env: 'STAGE', // optional, possible values : STAGE, PROD; default : PROD
        openInPopup: true // optional; default : true
      }
    );

    this.subs = this.checkoutService
      .checkoutJsInstance$
      .subscribe(instance => console.log(instance));
  }

  userByEmailData: any = [];
  getUserByEmail() {
    this.spinner.show();
    this.api.userGetByEmail(this.userObj.email).subscribe(
      (response) => {
        if (response.status) {
          this.userByEmailData = response.data;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    )
  }
  amount: number = 0;
  cashIn: boolean = false;
  cashOut: boolean = false;

  minAmt:number = 10;
  maxAmt:number = 100000;
  walletOperation(action, template: TemplateRef<any>) {
    this.amount = 10;
    this.cashIn = false;
    this.cashOut = false;
    if (action == "cashIn") {
      this.cashOut = false;
      this.cashIn = true;
    }
    if (action == "cashOut") {
      this.cashIn = false;
      this.cashOut = true;
    }
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    let modalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.show(template, modalOptions);
  }

  onSubmit() {
    if (this.cashOut) {
      this.cashOutSubmit();
    }
    if (this.cashIn) {
      this.cashInSubmit();
    }
  }

  isPG: boolean = false;
  cashInSubmit() {
    // return
    this.spinner.show();
    let data: any = {
      uid: this.userObj.uid,
      amount: this.amount
    };
    this.api.cashIn(data).subscribe(
      (response) => {
        if (response.status) {

          this.checkoutData = {
            orderId: response.data.orderId,
            amount: response.data.amount,
            token: response.data.txnToken,
            tokenType: "TXN_TOKEN"
          };
          this.checkoutBlink();
          this.toastr.info('Payment Gateway Loading ..');
          // this.modalService.hide();
          this.isPG= true;

        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }

  cashOutSubmit() {
    this.spinner.show();
    let data: any = {
      uid: this.userObj.uid,
      amount: this.amount
    };
    this.api.cashOut(data).subscribe(
      (response) => {
        if (response.status) {
          // this.userByEmailData = response.data;
          console.log(response);
          this.toastr.success('Success');
          this.getUserByEmail();
          this.modalService.hide();
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }



}
