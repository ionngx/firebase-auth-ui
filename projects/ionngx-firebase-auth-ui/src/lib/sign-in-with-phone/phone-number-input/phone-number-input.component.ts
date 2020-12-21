import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { LocationService } from '../../services/location.service';
import { CountryPopupComponent } from './country-popup.component';
import { DialCode } from '../../models/dial-code';
import { dialCodes } from './dial-codes';

@Component({
  selector: 'ionngx-firebase-auth-ui-phone-number-input',
  templateUrl: './phone-number-input.component.html',
  styleUrls: ['./phone-number-input.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PhoneNumberInputComponent implements OnInit {
  @Input()
  public label: string;

  @Input()
  public value: string;

  @Output()
  public valueChange: EventEmitter<string> = new EventEmitter<string>();

  public readonly data: DialCode[] = dialCodes;

  public selectedItem: DialCode;

  constructor(private locationService: LocationService, private popoverController: PopoverController) {}

  public async ngOnInit(): Promise<void> {
    const countryCode = await this.locationService.getCountryCode();
    this.setSelectedItem(this.data.find((d) => d.countryCode === countryCode));
  }

  private setSelectedItem(dialCode: DialCode) {
    if(!dialCode) {
      return;
    }
    this.selectedItem = dialCode;
    this.value = this.selectedItem.dialCode;
    this.valueChange.emit(this.value);
  }

  public async showPopup(evt: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: CountryPopupComponent,
      event: evt,
      cssClass: 'phone-number-input'
      });
    await popover.present();
    const result = await popover.onDidDismiss();
    this.setSelectedItem(result.data);
  }

  public handleInputChanged = (evt: any): void => {
    this.valueChange.emit(this.value);
  }
}
