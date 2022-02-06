import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {

  supportForm: FormGroup;
  userObj: any;
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    this.supportForm = this.formBuilder.group({
      email: [this.userObj.email, Validators.required],
      issue: ['', Validators.required],
      description: ['', Validators.required],
    });
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

  onSubmit() {
    console.log("----", this.supportForm.value)
  }
}
