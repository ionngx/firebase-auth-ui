import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

import { AuthProviderId } from '../enums';
import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';

@Component({
  selector: 'ionngx-firebase-auth-ui-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit, OnDestroy {
  @Input()
  public mode: 'bar' | 'stack' = 'bar';

  @Input()
  public isModal: boolean = false;

  private subscriptions: Subscription[] = [];

  public cancelLabel: string;
  public signInMessage: string;
  public signInLabel: string;

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
    this.signInMessage = stringResources.signInMessage;
    this.signInLabel = stringResources.signIn;

    if(this.isModal) {
      this.subscriptions.push(this.service.signInCompleted$.subscribe(this.handleSignInCompleted))
    }
  }

  public async signIn(): Promise<void> {
    await this.service.processSignIn(
      AuthProviderId.EmailAndPassword,
      this.email,
      this.password
    );
    if (this.isModal) {
      await this.modalController.dismiss();
    }
  }

  public async cancel(): Promise<boolean> {
    return await this.modalController.dismiss();
  }

  private handleSignInCompleted = (userCredential: firebase.auth.UserCredential): void => {
    this.modalController.dismiss();
  }
}
