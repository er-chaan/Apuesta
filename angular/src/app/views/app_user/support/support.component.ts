import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm: FormGroup;
  userObj: any;
  constructor(
    private api: ApiService, 
    private formBuilder: FormBuilder, 
    private spinner: NgxSpinnerService, 
    private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    this.supportForm = this.formBuilder.group({
      email: [this.userObj.email, Validators.required],
      issue: [0, Validators.required],
      description: ['', Validators.required],
    });
    this.getSupportByEmail();
  }

  isCollapsed: boolean = false;
  iconCollapse: string = 'icon-arrow-up';

  collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    this.iconCollapse = this.isCollapsed ? 'icon-arrow-down' : 'icon-arrow-up';
  }

  supportByEmailData: any = [];
  getSupportByEmail() {
    this.spinner.show();
    this.api.supportGetByEmail(this.userObj.email).subscribe(
      (response) => {
        if (response.status) {
          this.supportByEmailData = response.data;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      },
      (error) => {
        this.spinner.hide();
      },
    )
  }

  onSubmit() {
    if (this.supportForm.valid) {
      if (this.supportForm.get("issue").value == 0 || this.supportForm.get("issue").value == "0") {
        this.toastr.error("Select Issue");
      } else {
        this.spinner.show();
        this.api.supportPost(this.supportForm.value).subscribe(
          (response) => {
            if (response.status) {
              this.getSupportByEmail();
              this.onReset();
              this.toastr.success('Success');
            }
            else {
              this.toastr.error(response.error, 'API Error');
            }
            this.spinner.hide();
          },
          (error) => {
            this.spinner.hide();
          },
        )
      }
    } else {
      this.toastr.error("Invalid Form");
      return
    }
  }
  onReset() {
    // this.supportForm.reset();
    this.supportForm.get("issue").setValue("0");
    this.supportForm.get("description").setValue("");
  }

}
