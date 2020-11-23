import { Component, Input, OnInit } from '@angular/core';
import { IonicSafeString, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import firebase from 'firebase';

import { IonngxFirebaseAuthUiService } from '../../public-api';

@Component({
  selector: 'ionngx-firebase-auth-ui-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {



  @Input()
  public isModal: boolean = false;

  private subscriptions: Subscription[] = [];

  public cancelLabel: string;
  public signUpMessage: string;
  public signUpLabel: string;

  public email: string;
  public password: string;

  constructor(
    private service: IonngxFirebaseAuthUiService,
    private modalController: ModalController
  ) {}

  public ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    const stringResources = this.service.currentConfig.stringResources;
    this.cancelLabel = stringResources.cancel;
    this.signUpMessage = stringResources.signUpMessage;
    this.signUpLabel = stringResources.signUp;

    if(this.isModal) {
      this.subscriptions.push(this.service.signUpCompleted$.subscribe(this.handleSignUpCompleted))
    }
  }

  public async signUp(): Promise<void> {
    await this.service.processSignUp(this.email,
      this.password
    );
    if (this.isModal) {
      await this.modalController.dismiss();
    }
  }

  public async cancel(): Promise<boolean> {
    return await this.modalController.dismiss();
  }

  private handleSignUpCompleted = (userCredential: firebase.auth.UserCredential): void => {
    this.modalController.dismiss();
  }

}
