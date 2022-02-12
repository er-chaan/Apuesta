import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WalletRoutingModule } from './wallet-routing.module';
import { WalletComponent } from './wallet.component';
import { SharedModule } from '../../../core/shared.module';

import { CheckoutModule } from 'paytm-blink-checkout-angular';

@NgModule({
  declarations: [
    WalletComponent
  ],
  imports: [
    CommonModule,
    WalletRoutingModule,
    SharedModule,
    CheckoutModule
  ]
})
export class WalletModule { }

// https://staticpg.paytm.in/checkoutjs/21/docs/#/quickstart