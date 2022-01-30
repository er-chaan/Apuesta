import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
// import { Component } from '@angular/core';
import { Router } from "@angular/router";

// @Component({
//   template: '<ngx-spinner name="mySpinner"></ngx-spinner>',
// })

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  token: any;
  email: any;

  constructor(private router: Router, private spinner: NgxSpinnerService, private toastr: ToastrService) { }

  intercept(req, next) {
    // this.spinner.show("mySpinner", {
    //   type: "line-scale-party",
    //   size: "large",
    //   bdColor: "rgba(51,51,51,0.8)",
    //   color: "white"
    // });

    this.token = 'x';
    this.email = 'x';

    if (sessionStorage.getItem('token')) {
      this.token = sessionStorage.getItem('token');
      this.email = JSON.parse(sessionStorage.getItem('user')).email;
    }

    let tokenizedReq = req.clone({
      setHeaders: {
        "token": this.token,
        "email": this.email
      }
    });

    return next.handle(tokenizedReq).pipe(
      tap(
        event => {
          // this.toastr.success('', 'SUCCESS');
          // this.spinner.hide("");
        },
        error => {
          this.spinner.hide();
          console.log(error);
          this.toastr.error(error.message, 'API Error');
          if (error.status == 401) {
            sessionStorage.clear();
            this.router.navigate(['/login']);
            this.toastr.error('intrusion detected', 'ALERT');
          }
        }
      )
    );

  }

}
