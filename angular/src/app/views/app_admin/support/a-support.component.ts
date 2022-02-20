import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';

@Component({
  selector: 'app-a-support',
  templateUrl: './a-support.component.html',
  styleUrls: ['./a-support.component.scss']
})
export class ASupportComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private api: ApiService,
    private modalService: BsModalService,
  ) { }

  getSupportListData: any = [];
  dtOptions: DataTables.Settings = {};
  ngOnInit(): void {
    this.getSupportList();
  }

  getSupportList() {
    this.dtOptions = {};
    this.getSupportListData = [];

    this.spinner.show();
    this.api.getSupportList().subscribe(
      (response) => {
        if (response.status) {
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 15, 20],
            processing: true,
            order: []
          };
          this.getSupportListData = response.data;
          this.modalDataTemp = this.getSupportListData;
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
  modalDataTemp: any;

  editModal(data, template) {
    this.modalData = data;
    this.openModal(template);
  }
  
  closeModal(){
    this.getSupportListData = this.modalDataTemp;
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
  updateSupport() {
    delete this.modalData.createdAt;
    delete this.modalData.updatedAt;

    this.spinner.show();
    this.api.supportUpdate(this.modalData).subscribe(
      (response) => {
        if (response.status) {
          this.getSupportList();
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
