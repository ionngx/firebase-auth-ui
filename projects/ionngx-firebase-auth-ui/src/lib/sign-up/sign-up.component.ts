import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

import { IonngxFirebaseAuthUiService } from '../../public-api';

@Component({
  selector: 'ionngx-firebase-auth-ui-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  @Input()
  public isModal: boolean = false;

  public cancelLabel: string;
  public emailLabel: string;
  public passwordLabel: string;
  public newEmail: string;
  public newPassword: string;
  public signUpLabel: string;
  public signUpMessage: string;

  constructor(
    private service: IonngxFirebaseAuthUiService,
    private modalController: ModalController
  ) {}

  public async cancel(): Promise<boolean> {
    return await this.modalController.dismiss();
  }

  public ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    const stringResources = this.service.currentConfig.stringResources;
    this.cancelLabel = stringResources.cancel;
    this.emailLabel = stringResources.email;
    this.passwordLabel = stringResources.password;
    this.signUpMessage = stringResources.signUpMessage;
    this.signUpLabel = stringResources.signUp;

    if(this.isModal) {
      this.subscriptions.push(this.service.signUpCompleted$.subscribe(this.handleSignUpCompleted))
    }
  }

  public async signUp(): Promise<void> {
    await this.service.signUp(this.newEmail,
      this.newPassword
    );
    if (this.isModal) {
      await this.modalController.dismiss();
    }
  }

  private handleSignUpCompleted = (userCredential: firebase.auth.UserCredential): void => {
    this.modalController.dismiss();
  }
}
