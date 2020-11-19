import { Inject, Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, Subject } from 'rxjs';

import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from './config';
import { User } from './models';

/**
 * Service that handles communication with Firebase Auth via AngularFireAuth
 */
@Injectable({
  providedIn: 'root'
})
export class IonngxFirebaseAuthUiService {
  private signedOutSubject: Subject<void> = new Subject<void>();

  /**
   * Provides notifications that the user has signed out
   */
  public signedOut$: Observable<void> = this.signedOutSubject.asObservable();

  constructor(@Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig,
              private angularFireAuth: AngularFireAuth) { }

  /**
   * Provides user state and updates to it
   */
  public get user$(): Observable<User> {
    return this.angularFireAuth.user;
  }

  /**
   * Provide the current configuration
   */
  public get currentConfig(): IonngxFirebaseAuthUiConfig {
    return this.config;
  }

  /**
   * Navigates to configured sign in route if configured, otherwise shows sign in control in modal
   */
  public async signIn(): Promise<void> { }

  /**
   * Navigates to the configured sign out route if configured,
   * otherwise initiates the sign out process and emits signedOut event when complete
   */
  public async signOut(): Promise<void> {
    // TODO: Navigate to sign out route if configured
    await this.angularFireAuth.signOut();
    this.signedOutSubject.next();
  }

  /**
   * Navigates to configured sign up route if configured, otherwise shows sign up in model
   */
  public async signUp(): Promise<void> {

  }

  /**
   * Navigates to configured view profile route if configured, otherwise shows profile in modal
   */
  public async viewProfile(): Promise<void> { }
}
