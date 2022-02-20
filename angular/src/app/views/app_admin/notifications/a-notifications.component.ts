import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../../../core/api.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-a-notifications',
  templateUrl: './a-notifications.component.html',
  styleUrls: ['./a-notifications.component.scss']
})
export class ANotificationsComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private api: ApiService,
    private modalService: BsModalService,
  ) { }

  getNotificationsListData: any = [];
  dtOptions: DataTables.Settings = {};

  ngOnInit(): void {
    this.getNotificationsList();
  }

  getNotificationsList() {
    this.dtOptions = {};
    this.getNotificationsListData = [];

    this.spinner.show();
    this.api.getNotificationsList().subscribe(
      (response) => {
        if (response.status) {
          this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 5,
            lengthMenu: [5, 10, 15, 20],
            processing: true,
            order: []
          };
          this.getNotificationsListData = response.data;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }

  deleteNotification(id) {
    const data = {
      id: id
    };
    this.spinner.show();
    this.api.deleteNotification(data).subscribe(
      (response) => {
        if (response.status) {
          this.getNotificationsList();
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }

  createNotificationModal(template) {
    this.createNotificationData = {
      title: "",
      description: ""
    }
    this.openModal(template);
  }

  createNotificationData: any = {};
  createNotification() {
    this.spinner.show();
    this.api.createNotification(this.createNotificationData).subscribe(
      (response) => {
        if (response.status) {
          this.getNotificationsList();
          this.modalService.hide();
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    );
  }

  modalRef: BsModalRef;
  openModal(template: TemplateRef<any>) {
    let modalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.show(template, modalOptions);
  }

  trackFunction(index: number, element: any) {
    return element ? element.id : null
  }

}
