import { Inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { ToastController } from '@ionic/angular';
import firebase from 'firebase/app';
import 'firebase/auth';

import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../config';
import { authProviders } from '../data/auth-providers';
import { AuthProviderId } from '../enums';

/**
 * Service that handles communication with Firebase Auth via AngularFireAuth
 */
@Injectable({
  providedIn: 'root',
})
export class IonngxFirebaseAuthUiService {
  private profileUpdatedCompletedSubject: Subject<firebase.User | null> = new Subject<firebase.User | null>();
  private signInCompletedSubject: Subject<firebase.auth.UserCredential | null> = new Subject<firebase.auth.UserCredential | null>();
  private signOutCompletedSubject: Subject<boolean> = new Subject<boolean>();
  private signUpCompletedSubject: Subject<firebase.auth.UserCredential | null> = new Subject<firebase.auth.UserCredential | null>();

  /**
   * Provices notifications that an update to the users profile has completed
   */
  public profileUpdated$: Observable<firebase.User | null> = new Observable<firebase.User | null>();

  /**
   * Provides notifications that the sign in process has completed
   */
  public signInCompleted$: Observable<firebase.auth.UserCredential | null> = this.signInCompletedSubject.asObservable();
  /**
   * Provides notifications that the user has signed out
   */
  public signOutCompleted$: Observable<boolean> = this.signOutCompletedSubject.asObservable();
  /**
   * Provides notifications that the sign up process has completed
   */
  public signUpCompleted$: Observable<firebase.auth.UserCredential | null> = this.signUpCompletedSubject.asObservable();

  /**
   * Provide the current configuration
   */
  public get currentConfig(): IonngxFirebaseAuthUiConfig {
    return this.config;
  }

  /**
   * Provides user crednetial as observable that provides updates
   */
  public get credential$(): Observable<firebase.auth.UserCredential> {
    return this.angularFireAuth.credential;
  }

  /**
   * Provides user as obeservable that provides updates
   */
  public get user$(): Observable<firebase.User> {
    return this.angularFireAuth.user;
  }

  /**
   * Provides the current user state without updates
   */
  public get currentUser(): Promise<firebase.User> {
    return this.angularFireAuth.currentUser;
  }

  constructor(
    @Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig,
    private angularFireAuth: AngularFireAuth,
    private toastController: ToastController
  ) {

  }

  /**
   * Completes the sign in with phone number process
   *
   * @param confirmationResult Confirmation result returned from intialisation of sign in with phone number
   * @param verificationCode Verification code sent to the user via SMS
   */
  public async completePhoneSignIn(
    confirmationResult: firebase.auth.ConfirmationResult,
    verificationCode: string
  ): Promise<void> {
    try {
      const result = await confirmationResult.confirm(verificationCode);
      return this.handleSignInSuccess(result);
    } catch (err) {
      return this.handleSignInError(err);
    }
  }

  /**
   * Processes a sign in request
   *
   * @param providerId Id of the provider to use for authentication
   */
  public async signIn(providerId: AuthProviderId): Promise<void> {
    const provider = this.findAuthProvider(providerId);
    let result: firebase.auth.UserCredential | any;

    try {
      switch (providerId) {
        case AuthProviderId.Anonymous:
          result = await this.angularFireAuth.signInAnonymously();
          break;
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
   * Processes sign in with email and password
   *
   * @param email Email address
   * @param password Password
   */
  public async signInWithEmailAndPassword(email: string, password: string): Promise<void> {
    let result: firebase.auth.UserCredential | any;
    try {
      result = await this.angularFireAuth.signInWithEmailAndPassword(email, password);
      return this.handleSignInSuccess(result as firebase.auth.UserCredential);
    } catch (err) {
      return this.handleSignInError(err);
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
   * Processes sign out
   */
  public async signOut(): Promise<void> {
    try {
      await this.angularFireAuth.signOut();
      return this.handleSignOutSuccess();
    } catch (err) {
      return this.handleSignOutError(err);
    }
  }

  /**
   * Processes sign up with email and password
   * @param email Email address
   * @param password Password
   */
  public async signUp(email: string, password: string): Promise<void> {
    try {
      const result = await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
      return this.handleSignUpSuccess(result);
    } catch (err) {
      return this.handleSignUpError(err);
    }
  }

  /**
   * Updates the users current display name
   *
   * @param displayName The new display name to use
   */
  public async updateDisplayName(displayName: string): Promise<void> {
    const user = await this.angularFireAuth.currentUser;
    try {
      await user.updateProfile({ displayName });
      return this.handleUpdateProfileSuccess(user);
    } catch (err) {
      return this.handleUpdateProfileError(err);
    }
  }

  private findAuthProvider(providerId: AuthProviderId) {
    return authProviders.find((p) => p.id === providerId);
  }

  private async handleUpdateProfileError(err: any): Promise<any> {
    this.profileUpdatedCompletedSubject.next(null);
    return this.showErrorToast(err, this.config.stringResources.updateProfileFailureMessage);
  }

  private async handleUpdateProfileSuccess(user: firebase.User): Promise<void> {
    this.profileUpdatedCompletedSubject.next(user);
    if (typeof this.currentConfig.updateProfileCallback === 'function') {
      this.currentConfig.updateProfileCallback(user);
    }

    return this.showSuccessToast(this.config.stringResources.updateProfileSuccessMessage);
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

    return this.showSuccessToast(this.config.stringResources.signInSuccessMessage);
  }

  private async handleSignOutError(err: any): Promise<void> {
    this.signOutCompletedSubject.next(false);
    return this.showErrorToast(err, this.config.stringResources.signOutFailureMessage);
  }

  private async handleSignOutSuccess(): Promise<void> {
    this.signOutCompletedSubject.next(true);
    if (typeof this.currentConfig.signOutSuccessCallback === 'function') {
      this.currentConfig.signOutSuccessCallback();
    }
    return this.showSuccessToast(this.config.stringResources.signOutSuccessMessage);
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
    return this.showSuccessToast(this.config.stringResources.signUpSuccessMessage);
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
