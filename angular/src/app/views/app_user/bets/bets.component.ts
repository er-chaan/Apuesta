import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-bets',
  templateUrl: './bets.component.html',
  styleUrls: ['./bets.component.scss']
})
export class BetsComponent implements OnInit {

  userObj: any;
  betsByUidData: any = [];
  // dtOptions: any = {};
  dtOptions: DataTables.Settings = {};

  constructor(
    private api: ApiService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    this.getBetsByUid();
  }

  getBetsByUid() {
    this.dtOptions = {};
    this.betsByUidData = [];

    this.spinner.show();
    this.api.betsGetByUid(this.userObj.uid).subscribe(
      (response) => {
        if (response.status) {
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 15, 20],
            processing: true,
            order: []
          };
          this.betsByUidData = response.data;
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

}

