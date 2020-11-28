import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';

import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../config';
import { authProviders } from '../data/auth-providers';
import { AuthProviderId } from '../enums';
import { User } from '../models';
import { ModalService } from './modal.service';

/**
 * Service that handles communication with Firebase Auth via AngularFireAuth
 */
@Injectable({
  providedIn: 'root',
})
export class IonngxFirebaseAuthUiService {
  private signInCompletedSubject: Subject<firebase.auth.UserCredential | null> = new Subject<firebase.auth.UserCredential | null>();
  private signUpCompletedSubject: Subject<firebase.auth.UserCredential | null> = new Subject<firebase.auth.UserCredential | null>();
  private signedOutSubject: Subject<void> = new Subject<void>();
  private isSignedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  /**
   * Indicates if the user is currently signed in and updates when they sign out or in
   */
  public isSignedIn$: Observable<boolean> = this.isSignedInSubject.asObservable();

  /**
   * Provides notifications that the sign in process has completed
   */
  public signInCompleted$: Observable<firebase.auth.UserCredential | null> = this.signInCompletedSubject.asObservable();
  /**
   * Provides notifications that the sign up process has completed
   */
  public signUpCompleted$: Observable<firebase.auth.UserCredential | null> = this.signUpCompletedSubject.asObservable();
  /**
   * Provides notifications that the user has signed out
   */
  public signedOut$: Observable<void> = this.signedOutSubject.asObservable();

  /**
   * Provide the current configuration
   */
  public get currentConfig(): IonngxFirebaseAuthUiConfig {
    return this.config;
  }

  /**
   * Provides user state and updates to it
   */
  public get user$(): Observable<User> {
    return this.angularFireAuth.user;
  }

  constructor(
    @Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig,
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private toastController: ToastController,
    private modalService: ModalService
  ) {
    this.angularFireAuth.user.subscribe((u) => this.isSignedInSubject.next(u && !u.isAnonymous));
  }

  /**
   * Processes a sign in request
   *
   * @param providerId Id of the provider to use for authentication
   */
  public async processSignIn(
    providerId: AuthProviderId,
    email?: string,
    password?: string
  ): Promise<void> {
    const provider = this.findAuthProvider(providerId);
    let result: firebase.auth.UserCredential | any;

    try {
      switch (providerId) {
        case AuthProviderId.Anonymous:
          result = await this.angularFireAuth.signInAnonymously();
          break;
        case AuthProviderId.EmailAndPassword:
          result = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
          break;
        case AuthProviderId.PhoneNumber:
          await this.modalService.showSignInWithPhone();
          return;
        default:
          result = await this.angularFireAuth.signInWithPopup(provider.provider);
          break;
      }
      return this.handleSignInSuccess(result as firebase.auth.UserCredential);
    } catch (err: any) {
      return this.handleSignInError(err);
    }
  }

  /**
   * Processes sign up with email and password
   * @param email Email address
   * @param password Password
   */
  public async processSignUp(email: string, password: string): Promise<void> {
    try {
      const result = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
      return this.handleSignUpSuccess(result);
    } catch (err) {
      return this.handleSignUpError(err);
    }
  }

  /**
   * Navigates to configured sign in route if configured, otherwise shows sign in control in modal
   */
  public async signIn(): Promise<void> {
    if (this.config.signInRoute) {
      this.navigate(this.config.signInRoute);
    } else {
      return this.modalService.showSignInModal();
    }
  }

  /**
   *  Initiates signing in with phone number
   */
  public signInWithPhoneNumber(
    phoneNumber: string,
    recaptchaVerifier: firebase.auth.RecaptchaVerifier
  ): Promise<firebase.auth.ConfirmationResult> {
    return this.angularFireAuth.signInWithPhoneNumber(phoneNumber, recaptchaVerifier);
  }

  /**
   * Navigates to the configured sign out route if configured,
   * otherwise initiates the sign out process and emits signedOut event when complete
   */
  public async signOut(): Promise<void> {
    if (this.config.signOutRoute) {
      this.navigate(this.config.signOutRoute);
    } else {
      await this.angularFireAuth.signOut();
      this.signedOutSubject.next();
    }
  }

  /**
   * Navigates to configured sign up route if configured, otherwise shows sign up in model
   */
  public async signUp(): Promise<void> {
    if (this.config.signUpRoute) {
      this.navigate(this.config.signUpRoute);
    } else {
      return this.modalService.showSignUpModal();
    }
  }

  public async completePhoneSignIn(confirmationResult: firebase.auth.ConfirmationResult, verificationCode: string): Promise<void> {
    try {
      const result = await confirmationResult.confirm(verificationCode);
      return this.handleSignInSuccess(result);
    } catch (err) {
      return this.handleSignInError(err);
    }
  }

  /**
   * Navigates to configured view profile route if configured, otherwise shows profile in modal
   */
  public async viewProfile(): Promise<void> {
    if (this.config.viewProfileRoute) {
      this.navigate(this.config.viewProfileRoute);
    } else {
      // TODO: show profile using modal
    }
  }

  private findAuthProvider(providerId: AuthProviderId) {
    return authProviders.find((p) => p.id === providerId);
  }

  private async handleSignInError(err: any): Promise<any> {
    this.signInCompletedSubject.next(null);
    return this.showErrorToast(err, this.config.stringResources.signInFailureMessage);
  }

  private async handleSignInSuccess(userCredential: firebase.auth.UserCredential): Promise<void> {
    this.signInCompletedSubject.next(userCredential);
    if (typeof this.currentConfig.signInSuccessCallback === 'function') {
      this.currentConfig.signInSuccessCallback(userCredential);
    }

    if (this.currentConfig.signInSuccessRoute) {
      this.navigate(this.currentConfig.signInSuccessRoute);
    }

    return this.showSuccessToast(this.config.stringResources.signInSuccessMessage);
  }

  private async handleSignUpError(err: any): Promise<void> {
    this.signUpCompletedSubject.next(null);
    return this.showErrorToast(err, this.config.stringResources.signUpFailureMessage);
  }

  private async handleSignUpSuccess(userCredential: firebase.auth.UserCredential): Promise<void> {
    this.signUpCompletedSubject.next(userCredential);
    if (typeof this.currentConfig.signUpSuccessCallback === 'function') {
      this.currentConfig.signUpSuccessCallback(userCredential);
    }

    if (this.currentConfig.signUpSuccessRoute) {
      this.navigate(this.currentConfig.signUpSuccessRoute);
    }
    return this.showSuccessToast(this.config.stringResources.signInSuccessMessage);
  }

  private navigate(route: string | string[]) {
    if (Array.isArray(route)) {
      this.router.navigate(route);
    } else {
      this.router.navigateByUrl(route as string);
    }
  }

  private async showErrorToast(err: any, message: string): Promise<void> {
    console.error(err);
    if (this.config.showToastMessageOnFailure) {
      const toast = await this.toastController.create({
        message: err.toString() || message,
        color: 'danger',
        duration: 3000,
      });
      return toast.present();
    }

    return Promise.reject(err);
  }

  private async showSuccessToast(message: string): Promise<void> {
    if (this.config.showToastMessageOnSuccess) {
      const toast = await this.toastController.create({
        message: message,
        color: 'success',
        duration: 2000,
      });
      return toast.present();
    }

    return Promise.resolve();
  }
}
