import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInWithPhoneComponent } from '../sign-in-with-phone/sign-in-with-phone.component';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Injectable()
export class ModalService {

  constructor(private modalController: ModalController) { }

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

  public async showSignInWithPhone(): Promise<void> {
    const modal = await this.modalController.create({
      component: SignInWithPhoneComponent
    });
    return modal.present();
  }
}
