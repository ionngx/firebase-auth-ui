import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';

import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from './config';
import { AuthProviderId } from './enums';
import { User } from './models';

/**
 * Service that handles communication with Firebase Auth via AngularFireAuth
 */
@Injectable({
  providedIn: 'root',
})
export class IonngxFirebaseAuthUiService {
  private signedOutSubject: Subject<void> = new Subject<void>();

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
    private router: Router
  ) {}

  /**
   * Processes a sign in request
   *
   * @param providerId Id of the provider to use for authentication
   */
  public processSignIn(providerId: AuthProviderId): void {}

  /**
   * Navigates to configured sign in route if configured, otherwise shows sign in control in modal
   */
  public async signIn(): Promise<void> {
    if (this.config.signInRoute) {
      this.navigate(this.config.signInRoute);
    } else {
      // TODO: show sign in using modal
    }
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
      // TODO: show sign up using modal
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

  private navigate(route: string | string[]) {
    if (Array.isArray(route)) {
      this.router.navigate(route);
    } else {
      this.router.navigateByUrl(route as string);
    }
  }
}
