import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './landing.component';

// google login
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
} from 'angularx-social-login';

@NgModule({
  declarations: [LandingComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    // SocialLoginModule,
  ],
  providers:[
    // {
    //   provide: 'SocialAuthServiceConfig',
    //   useValue: {
    //     autoLogin: false,
    //     providers: [
    //       {
    //         id: GoogleLoginProvider.PROVIDER_ID,
    //         provider: new GoogleLoginProvider(
    //           '831612447328-o4jk13j8kk0jvlfog5pqgk94km5kn112.apps.googleusercontent.com'
    //         )
    //       },
    //     ]
    //   } as SocialAuthServiceConfig,
    // }
  ]
})
export class LandingModule { }
