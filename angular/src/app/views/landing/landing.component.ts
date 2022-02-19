// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-landing',
//   templateUrl: './landing.component.html',
//   styleUrls: ['./landing.component.scss']
// })
// export class LandingComponent implements OnInit {

//   constructor() { }

//   ngOnInit(): void {
//   }

// }




import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from "../../core/api.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  // encapsulation: ViewEncapsulation.None,
})
export class LandingComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;
  userObj: any;

  constructor(private api: ApiService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private authService: SocialAuthService) { }

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.userObj = JSON.parse(sessionStorage.getItem("user"));
      if (this.userObj.email == "er.chandreshbhai@gmail.com") {
        this.router.navigate(["/admin/dashboard"]);
      }else{
        this.router.navigate(["/board"]);
      }
      return
    }
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }

  signInWithGoogle(): void {
    this.spinner.show();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((x) => {
      this.auth();
    }).catch((x) => {
      this.spinner.hide();
      if (x.error) {
        this.toastr.error(x.error);
      } else {
        this.toastr.error(x + " OR try ctrl + F5");
      }
    });

  }

  auth() {
    this.api.auth(this.user).subscribe(
      (response) => {
        if (response.status) {
          sessionStorage.setItem("token", response.data.authToken);
          sessionStorage.setItem("user", JSON.stringify(response.data));
          this.userObj = JSON.parse(sessionStorage.getItem("user"));
          if (this.userObj.email == "er.chandreshbhai@gmail.com") {
            this.router.navigate(["/admin/dashboard"]);
          }else{
            this.router.navigate(["/board"]);
          }
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

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
