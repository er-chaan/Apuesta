import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-a-board',
  templateUrl: './a-board.component.html',
  styleUrls: ['./a-board.component.scss']
})
export class ABoardComponent implements OnInit {
  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private api: ApiService,
    private modalService: BsModalService,
  ) { }

  getBoardListData: any = [];
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getBoardList();
  }

  getBoardList() {
    this.dtOptions = {};
    this.getBoardListData = [];

    this.spinner.show();
    this.api.getBoardList().subscribe(
      (response) => {
        if (response.status) {
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 15, 20],
            processing: true,
            order: []
          };
          this.getBoardListData = response.data;
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


  modalData: any;
  editModal(data, template) {
    this.modalData = data;
    this.openModal(template);
  }
  closeModal() {
    this.modalService.hide();
  }
  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    let modalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.show(template, modalOptions);
  }
  
  updateRates() {
    delete this.modalData.startsAt;
    delete this.modalData.endsAt;
    delete this.modalData.updatedAt;

    this.spinner.show();
    this.api.boardUpdate(this.modalData).subscribe(
      (response) => {
        if (response.status) {
          this.getBoardList();
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
