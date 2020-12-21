import { AfterContentInit, AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';
import 'firebase/auth';

import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'ionngx-firebase-auth-ui-sign-in-with-phone',
  templateUrl: './sign-in-with-phone.component.html',
  styleUrls: ['./sign-in-with-phone.component.scss']
})
export class SignInWithPhoneComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input()
  public isModal: boolean = false;

  private subscriptions: Subscription[] = [];
  private recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  private confirmationResult: firebase.auth.ConfirmationResult;

  public cancelLabel: string;
  public enterPhoneNumberMessage: string;
  public enterVerificationCodeMessage: string;
  public phoneNumberSignIn: string;
  public phoneNumberLabel: string;
  public submitLabel: string;
  public verificationCodeLabel: string;

  public phoneNumber: string;
  public processingPhoneNumber: boolean = false;
  public step: number = 1;
  public verificationCode: string;

  public get canSumbitPhoneNumber(): boolean {
    return this.phoneNumber && this.phoneNumber.length >= 5;
  }

  constructor(private service: IonngxFirebaseAuthUiService, private modalController: ModalController) { }

  public async ngAfterViewInit(): Promise<void> {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-root', {
      'size': this.service.currentConfig.useInvisibleReCaptha ? 'invisible' : 'normal',
      'callback': this.handleRecaptchaResponse,
      'expired-callback': this.handleExpiredRecaptcha
    });
  }

  public ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public ngOnInit(): void {
    const stringResources = this.service.currentConfig.stringResources;
    this.cancelLabel = stringResources.cancel;
    this.enterPhoneNumberMessage = stringResources.enterPhoneNumberMesssage;
    this.enterVerificationCodeMessage = stringResources.enterVerificationCodeMessage;
    this.phoneNumberSignIn = stringResources.enterPhoneNumber;
    this.phoneNumberLabel = stringResources.phoneNumber;
    this.submitLabel = stringResources.submit;
    this.verificationCodeLabel = stringResources.verificationCode;
  }

  public async cancel(): Promise<void> {
    await this.modalController.dismiss()
  }

  public async submitPhoneNumber(): Promise<void> {
    this.processingPhoneNumber = true;
    this.confirmationResult = await this.service.signInWithPhoneNumber(this.phoneNumber,this.recaptchaVerifier);
  }

  public async submitVerificationCode(): Promise<void> {
    await this.service.completePhoneSignIn(this.confirmationResult, this.verificationCode);
    await this.modalController.dismiss();
  }

  private handleRecaptchaResponse = (response: any): void => {
    this.step = 2;
  }

  private handleExpiredRecaptcha(): void {
    console.error('reCAPTCHA expired');
  }
}
