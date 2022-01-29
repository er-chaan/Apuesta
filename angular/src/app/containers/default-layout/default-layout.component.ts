import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import { SocialAuthService } from "angularx-social-login";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  date = new Date();

  constructor(private router: Router, private authService: SocialAuthService) { }

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  signOut(): void {
    alert();
    this.authService.signOut().then(()=>{
      sessionStorage.clear();
      this.router.navigate(["/"]);
    });
  }

}
