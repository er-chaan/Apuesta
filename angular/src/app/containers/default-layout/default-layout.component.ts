import { Component } from '@angular/core';
import { navItems, navItemsAdmin, navItemsUser } from '../../_nav';
import { SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
import { ApiService } from '../../core/api.service';

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
  public navItemsAdmin = navItemsAdmin;
  public navItemsUser = navItemsUser;
  public now: Date = new Date();

  userObj: any;
  constructor(private spinner: NgxSpinnerService, private toastr: ToastrService, private api: ApiService, private router: Router, private authService: SocialAuthService) {
    this.userObj = JSON.parse(sessionStorage.getItem("user"));
    if(this.userObj.email == "er.chandreshbhai@gmail.com"){
      this.navItems = navItemsAdmin
    }else{
      this.navItems = navItemsUser
    }
    setInterval(() => {
      this.now = new Date();
    }, 1);
  }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  signOut(): void {
    // this.authService.signOut().then(()=>{
    // sessionStorage.clear();
    // this.router.navigate(["/"]);
    // });
    this.api.logout().subscribe(
      (response) => {
        if (response.status) {
          sessionStorage.clear();
          this.router.navigate(["/"]);
          this.authService.signOut();
        }
        else {
          this.toastr.error(response.error, 'API Error');
        }
        this.spinner.hide();
      },
      (error) => {
        this.toastr.error('API Error');
        this.spinner.hide();
      },
    )
  }

}
