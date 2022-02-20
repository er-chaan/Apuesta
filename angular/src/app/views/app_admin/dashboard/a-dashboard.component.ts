import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.scss']
})
export class ADashboardComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getTotalUsers();
    this.getTotalOnlineUsers();
    this.getTotalBalanceUsers();
    this.getTotalBalanceBookie();
    this.getTotalBalanceJolo();

  }

  totalUsers: any = 0;
  getTotalUsers() {
    this.spinner.show();
    this.api.getTotalUsers().subscribe(
      (response) => {
        if (response.status) {
          this.totalUsers = response.data.res;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }
  totalOnlineUsers: any = 0;
  getTotalOnlineUsers() {
    this.spinner.show();
    this.api.getTotalOnlineUsers().subscribe(
      (response) => {
        if (response.status) {
          this.totalOnlineUsers = response.data.res;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }
  totalBalanceUsers: any = 0;
  getTotalBalanceUsers() {
    this.spinner.show();
    this.api.getTotalBalanceUsers().subscribe(
      (response) => {
        if (response.status) {
          this.totalBalanceUsers = response.data.res;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }
  totalBalanceBookie: any = 0;
  getTotalBalanceBookie() {
    this.spinner.show();
    this.api.getTotalBalanceBookie().subscribe(
      (response) => {
        if (response.status) {
          this.totalBalanceBookie = response.data.res;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }
  totalBalanceJolo: any = 0;
  totalProfit:any=0;
  getTotalBalanceJolo() {
    this.spinner.show();
    this.api.getTotalBalanceJolo().subscribe(
      (response) => {
        if (response.status) {
          this.totalBalanceJolo = response.data.res;
          this.totalProfit = parseFloat(this.totalBalanceJolo) + parseFloat(this.totalBalanceBookie);
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }


}
