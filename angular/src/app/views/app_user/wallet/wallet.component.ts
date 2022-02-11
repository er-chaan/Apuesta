import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit {

  userObj: any;
  modalRef: BsModalRef;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    this.getUserByEmail();
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

  walletOperation(action, template: TemplateRef<any>) {
    this.amount = 100;
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

  cashInSubmit() {
    this.spinner.show();
    let data: any = {
      uid: this.userObj.uid,
      amount: this.amount
    };
    this.api.cashIn(data).subscribe(
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
