import { Component } from '@angular/core';
import { navItems } from '../../_nav';
import { SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
  styles: [
    `
    .xxx {
      display:none
    }
    
    `
  ]
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  public now: Date = new Date();

  userObj: any;
  constructor(private router: Router, private authService: SocialAuthService) {
    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  signOut(): void {
    sessionStorage.clear();
    this.router.navigate(["/"]);
    this.authService.signOut();
    // this.authService.signOut().then(()=>{
    // sessionStorage.clear();
    // this.router.navigate(["/"]);
    // });
  }

}
