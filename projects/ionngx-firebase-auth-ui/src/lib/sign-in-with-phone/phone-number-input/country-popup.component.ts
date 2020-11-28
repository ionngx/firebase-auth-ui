import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { DialCode } from '../../models/dial-code';
import { dialCodes } from './dial-codes';

@Component({
  selector: 'ionngx-firebase-auth-ui-country-popup',
  templateUrl: './country-popup.component.html',
  styleUrls: ['./country-popup.component.scss']
})
export class CountryPopupComponent {

  public data: DialCode[] = dialCodes;

  constructor(private popoverController: PopoverController) { }

  public selectItem(item: DialCode): Promise<boolean> {
    return this.popoverController.dismiss(item);
  }
}
