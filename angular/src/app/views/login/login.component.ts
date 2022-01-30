import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent {
  user: SocialUser;
  loggedIn: boolean;

  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private router: Router, private authService: SocialAuthService) { }

  ngOnInit() {
    if (sessionStorage.getItem("token")) {
      this.router.navigate(["/"]);
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
      sessionStorage.setItem("token", this.user.authToken);
      sessionStorage.setItem("user", JSON.stringify(this.user));
      this.spinner.hide();
      this.router.navigate(["/"]);
    }).catch((x)=>{
      this.spinner.hide();
      this.toastr.error('API Error');
    });

  }

  signOut(): void {
    this.authService.signOut();
  }

  refreshToken(): void {
    this.authService.refreshAuthToken(GoogleLoginProvider.PROVIDER_ID);
  }

}
