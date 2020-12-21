import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';

import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../config';
import { SignInComponent } from '../sign-in/sign-in.component';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SignInWithPhoneComponent } from '../sign-in-with-phone/sign-in-with-phone.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { IonngxFirebaseAuthUiService } from './ionngx-firebase-auth-ui.service';

@Injectable()
export class NavigatorService {
  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    @Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig,
    private router: Router,
    private modalController: ModalController,
    private service: IonngxFirebaseAuthUiService
  ) {
    this.service.signInCompleted$.subscribe({ next: this.handleSignInCompleted });
    this.service.signUpCompleted$.subscribe({ next: this.handleSignUpCompleted });
    this.service.signOutCompleted$.subscribe({ next: this.handleSignOutCompleted });
  }

  /**
   * Navigates using the Angular router
   *
   * @param route The route to navigate to
   */
  public navigate(route: string | string[]) {
    if (Array.isArray(route)) {
      this.router.navigate(route);
    } else {
      this.router.navigateByUrl(route as string);
    }
  }

  /**
   * Navigates to an external url using the browser window
   *
   * @param url The external url
   */
  public navigateToExternalUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  /**
   * Navigates to configured sign in route if configured, otherwise shows sign in component in modal
   */
  public async signIn(): Promise<void> {
    if (this.config.signInRoute) {
      this.navigate(this.config.signInRoute);
      return Promise.resolve();
    } else {
      return this.showSignInModal();
    }
  }

  /**
   * Navigates to configured sign in with phone number route if configured, otherwise shows sign in with phone component in modal
   */
  public async signInWithPhoneNumber(): Promise<void> {
    if (this.config.signInWithPhoneNumberRoute) {
      this.navigate(this.config.signInWithPhoneNumberRoute);
      return Promise.resolve();
    } else {
      return this.showSignInWithPhoneModal();
    }
  }

  /**
   * Navigates to the configured sign out route if configured,
   * otherwise initiates the sign out process and emits signedOut event when complete
   */
  public signOut(): Promise<void> {
    if (this.config.signOutRoute) {
      this.navigate(this.config.signOutRoute);
      return Promise.resolve();
    }

    return this.service.signOut();
  }

  /**
   * Navigates to configured sign up route if configured, otherwise shows sign up in model
   */
  public async signUp(): Promise<void> {
    if (this.config.signUpRoute) {
      this.navigate(this.config.signUpRoute);
      return Promise.resolve();
    } else {
      return this.showSignUpModal();
    }
  }

  /**
   * Navigates to configured sign up route if configured, otherwise shows sign up in model
   */
  public async viewProfile(): Promise<void> {
    if (this.config.viewProfileRoute) {
      this.navigate(this.config.viewProfileRoute);
      return Promise.resolve();
    } else {
      return this.showUserProfileModal();
    }
  }

  private handleSignInCompleted = (arg: firebase.auth.UserCredential | null): void => {
    if (arg && this.config.signInSuccessRoute) {
      this.navigate(this.config.signInSuccessRoute);
    }
  }

  private handleSignOutCompleted = (arg: boolean): void => {
    if (arg && this.config.signOutSuccessRoute) {
      this.navigate(this.config.signOutSuccessRoute);
    }
  }

  private handleSignUpCompleted = (arg: firebase.auth.UserCredential | null): void => {
    if (arg && this.config.signUpSuccessRoute) {
      this.navigate(this.config.signUpSuccessRoute);
    }
  }

  private async showSignInModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SignInComponent,
      componentProps: { mode: 'bar', isModal: true },
    });
    return modal.present();
  }

  private async showSignInWithPhoneModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SignInWithPhoneComponent,
    });
    return modal.present();
  }

  private async showSignUpModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: SignUpComponent,
      componentProps: { isModal: true },
    });
    return modal.present();
  }

  private async showUserProfileModal(): Promise<void> {
    const modal = await this.modalController.create({
      component: UserProfileComponent,
      componentProps: { isModal: true },
    });
    return modal.present();
  }
}
