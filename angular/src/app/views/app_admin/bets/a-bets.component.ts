import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-a-bets',
  templateUrl: './a-bets.component.html',
  styleUrls: ['./a-bets.component.scss']
})
export class ABetsComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private api: ApiService,
  ) { }

  getBetsListData: any = [];
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.getBetsList();
  }

  getBetsList() {
    this.dtOptions = {};
    this.getBetsListData = [];

    this.spinner.show();
    this.api.getBetsList().subscribe(
      (response) => {
        if (response.status) {
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 15, 20],
            processing: true,
            order: []
          };
          this.getBetsListData = response.data;
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
