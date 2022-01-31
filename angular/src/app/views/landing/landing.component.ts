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




import { Component, OnInit } from '@angular/core';
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
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private api: ApiService, private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private authService: SocialAuthService) { }

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.router.navigate(["/dashboard"]);
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
      this.toastr.error('API Error');
    });

  }

  auth() {
    this.api.auth(this.user).subscribe(
      (response) => {
        if (response.status) {
          sessionStorage.setItem("token", response.data.authToken);
          sessionStorage.setItem("user", JSON.stringify(response.data));
          this.router.navigate(["/dashboard"]);
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
