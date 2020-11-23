
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { SignInComponent } from '../sign-in';
import { SignUpComponent } from '../sign-up';

@Injectable()
export class NavigatorService {

  constructor( @Inject(PLATFORM_ID) private platformId: any, private modalController: ModalController){}

  public navigateToExternalUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  public async showSignInModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SignInComponent,
      componentProps: {mode: 'bar', isModal: true}
    });
    return modal.present();
  }

  public async showSignUpModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SignUpComponent,
      componentProps: {isModal: true},

    });
    return modal.present();
  }
}
