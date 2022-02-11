import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class BankComponent implements OnInit {

  bankForm: FormGroup;
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
    this.bankForm = this.formBuilder.group({
      isVerified: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      accountNo: ['', Validators.required],
      ifscCode: ['', [Validators.required, Validators.pattern("^\s*([0-9a-zA-Z]+)\s*$")]],
    });
    this.getUserByEmail();
  }

  userByEmailData: any = [];
  isUpdateButton: boolean = false;
  getUserByEmail() {
    this.spinner.show();
    this.api.userGetByEmail(this.userObj.email).subscribe(
      (response) => {
        if (response.status) {
          this.userByEmailData = response.data;
          if (this.userByEmailData.mobile != 0 && this.userByEmailData.accountNo != 0 && this.userByEmailData.ifscCode != "0") {
            this.bankForm.patchValue({
              isVerified: this.userByEmailData.isVerified,
              mobile: this.userByEmailData.mobile,
              accountNo: this.userByEmailData.accountNo,
              ifscCode: this.userByEmailData.ifscCode
            });
            this.isUpdateButton = true;
          }
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    )
  }
  get f() {
    return this.bankForm.controls;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSubmit() {
    this.modalService.hide();
    if(this.userByEmailData.mobile == this.bankForm.get("mobile").value && this.userByEmailData.accountNo == this.bankForm.get("accountNo").value && this.userByEmailData.ifscCode == this.bankForm.get("ifscCode").value){
      this.toastr.info('Already updated');
      return
    }
    if(this.userByEmailData.accountNo != this.bankForm.get("accountNo").value || this.userByEmailData.ifscCode != this.bankForm.get("ifscCode").value){
      this.bankForm.get("isVerified").setValue(false);
    }
    if (this.bankForm.valid) {
      this.spinner.show();
      this.api.userUpdate(this.bankForm.value).subscribe(
        (response) => {
          if (response.status) {
            this.getUserByEmail();
            this.toastr.success('Success');
          }
          else {
            this.toastr.error(response.error, 'API Error');
          }
          this.spinner.hide();
        }
      )
    } else {
      this.spinner.hide();
      this.toastr.error("Invalid Form");
    }
  }

  onCancel() {
    this.bankForm.patchValue({
      mobile: this.userByEmailData.mobile,
      accountNo: this.userByEmailData.accountNo,
      ifscCode: this.userByEmailData.ifscCode
    });
  }

}
