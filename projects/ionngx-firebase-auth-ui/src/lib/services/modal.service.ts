import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { SignInComponent } from '../sign-in/sign-in.component';

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
      component: SignInComponent,
      componentProps: {isModal: true},

    });
    return modal.present();
  }
}
