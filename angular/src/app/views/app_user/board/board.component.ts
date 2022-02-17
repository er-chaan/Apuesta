import { Component, OnInit, OnDestroy, TemplateRef } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ApiService } from '../../../core/api.service';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit, OnDestroy {

  constructor(
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private api: ApiService,
    private modalService: BsModalService,
  ) { }

  modalRef: BsModalRef;
  noDataMsg: any = "Stay Tuned !";
  s1: any;
  s2: any;
  s3: any;
  ngOnInit(): void {
    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    this.getUserByEmail();
    this.getBoardByStatusInProgress();
    this.getBoardByStatusUpcoming();
    this.getBoardByStatusCompleted();

    this.s1 = setInterval(() => {
      this.getBoardByStatusInProgress();
    }, 10000);
    this.s2 = setInterval(() => {
      this.getBoardByStatusUpcoming();
    }, 20000);
    this.s3 = setInterval(() => {
      this.getBoardByStatusCompleted();
    }, 30000);

  }

  userObj: any;
  userByEmailData: any = [];
  getUserByEmail() {
    this.spinner.show();
    this.api.userGetByEmail(this.userObj.email).subscribe(
      (response) => {
        if (response.status) {
          this.userByEmailData = response.data;
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      }
    )
  }
  // boardSub: Subscription;
  // boardData: any = [];
  // getBoard() {
  //   this.boardSub = this.api.boardGet().subscribe(
  //     (response) => {
  //       if (response.status) {
  //         this.boardData = response.data;
  //       }
  //     }
  //   )
  // }

  boardUpcomingSub: Subscription;
  boardUpcomingData: any = [];
  getBoardByStatusUpcoming() {
    this.boardUpcomingSub = this.api.boardGetByStatus("upcoming").subscribe(
      (response) => {
        if (response.status) {
          this.boardUpcomingData = response.data;
        }
      }
    )
  }

  boardInProgressSub: Subscription;
  boardInProgressData: any = [];
  getBoardByStatusInProgress() {
    this.boardInProgressSub = this.api.boardGetByStatus("inProgress").subscribe(
      (response) => {
        if (response.status) {
          this.boardInProgressData = response.data;
        }
      }
    )
  }

  boardCompletedSub: Subscription;
  boardCompletedData: any = [];
  getBoardByStatusCompleted() {
    this.boardCompletedSub = this.api.boardGetByStatus("completed").subscribe(
      (response) => {
        if (response.status) {
          this.boardCompletedData = response.data;
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.boardInProgressSub) {
      this.boardInProgressSub.unsubscribe();
    }
    if (this.boardUpcomingSub) {
      this.boardUpcomingSub.unsubscribe();
    }
    if (this.boardCompletedSub) {
      this.boardCompletedSub.unsubscribe();
    }
    if (this.s1) {
      clearInterval(this.s1);
    }
    if (this.s2) {
      clearInterval(this.s2);
    }
    if (this.s3) {
      clearInterval(this.s3);
    }
  }

  betData: any = {};
  amount: number = 10;
  minAmt: number = 10;
  maxAmt: number = 100000;
  placeBet(type, bid, team, template) {
    this.amount = 10;
    this.betData.type = type;
    this.betData.uid = this.userObj.uid;
    this.betData.bid = bid;
    this.betData.team = team;
    this.openModal(template);
  }

  openModal(template: TemplateRef<any>) {
    let modalOptions: ModalOptions = {
      backdrop: 'static',
      keyboard: false
    };
    this.modalRef = this.modalService.show(template, modalOptions);
  }


  onSubmit() {  
    this.spinner.show();
    this.betData.amount = this.amount;
    this.api.placeBet(this.betData).subscribe(
      (response) => {
        if (response.status) {
          this.toastr.success('Success');
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
