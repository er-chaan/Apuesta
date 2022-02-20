import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-a-users',
  templateUrl: './a-users.component.html',
  styleUrls: ['./a-users.component.scss']
})
export class AUsersComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersListData: any = [];
  dtOptions: DataTables.Settings = {};

  getUsersList() {
    this.dtOptions = {};
    this.getUsersListData = [];

    this.spinner.show();
    this.api.getUsersList().subscribe(
      (response) => {
        if (response.status) {
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 15, 20],
            processing: true,
            order: []
          };
          this.getUsersListData = response.data;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }

  updateUserStatus(id, status) {

    // let text = "Press a button!\nEither OK or Cancel.";
    // if (confirm(text) == true) {
    //   text = "You pressed OK!";
    // } else {
    //   text = "You canceled!";
    // }

    if (status == 'active') {
      status = 'inactive';
    } else {
      status = 'active';
    }
    const data = {
      id: id,
      status: status
    };
    this.spinner.show();
    this.api.updateUserStatus(data).subscribe(
      (response) => {
        if (response.status) {
          this.getUsersList();
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }

  trackFunction(index: number, element: any) {
    return element ? element.id : null
  }

}
