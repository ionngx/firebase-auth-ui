import { Component, Inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import firebase from 'firebase/app';

import { AvatarMenuLinkItem } from './avatar-menu-link-item';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';
import { DisplayNameLocation } from '../enums/display-name-location';
import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../config';
import { authProviders } from '../data/auth-providers';
import { AuthProvider } from '../models';
import { AuthProviderId } from '../enums';

@Component({
  selector: 'ionngx-firebase-auth-ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnInit {
  @Input()
  public additionalLinks: AvatarMenuLinkItem[];

  @Input()
  public canSignIn = true;

  @Input()
  public canSignOut = true;

  @Input()
  public canSignUp = true;

  @Input()
  public canViewProfile = true;

  @Input()
  public hideWhenAnonymous = false;

  @Input()
  public mode: 'default' | 'simple' = 'default';

  @Input()
  public showDisplayName = false;

  @Input()
  public displayNameLocation: DisplayNameLocation = DisplayNameLocation.Left;

  public authProvider: AuthProvider;
  public user: firebase.User;
  public isVerified: boolean;

  public verificationPending = 'Email verification is not complete';
  public notSignedIn = 'Not signed in';

  public get statusMessage(): string {
    if(!this.user || this.user.isAnonymous) {
      return this.notSignedIn;
    }

    if(this.user && !this.user.emailVerified) {
      return this.verificationPending;
    }

    return ' ';
  }

  constructor(
    @Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig,
    private service: IonngxFirebaseAuthUiService,
    private popoverController: PopoverController
  ) {
    const stringResources = this.config.stringResources;
    this.verificationPending = stringResources.emailVerifiationPending;
    this.notSignedIn = stringResources.notSignedIn;
  }

  public enableInteraction(): boolean {
    return (
      this.mode === 'default' &&
      ((!this.user && (this.canSignIn || this.canSignUp)) ||
        (this.user && (this.canSignOut || this.canViewProfile)) ||
        (this.additionalLinks && this.additionalLinks.length > 0))
    );
  }

  public ngOnInit(): void {
    this.service.user$.subscribe(this.handleUserStateChange);
  }

  public async showMenu(evt: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: AvatarMenuComponent,
      componentProps: {
        additionalLinks: this.additionalLinks,
        authProvider: this.authProvider,
        canSignIn: Boolean(this.canSignIn),
        canSignOut: Boolean(this.canSignOut),
        canViewProfile: Boolean(this.canViewProfile),
        user: this.user,
      },
      event: evt,
    });

    return await popover.present();
  }

  private handleUserStateChange = (user: firebase.User) => {
    this.user = user;
    if(!this.user) {
      this.authProvider = undefined;
      this.isVerified = false;
      return;
    }
    if(this.user.phoneNumber && !this.user.email) {
      this.authProvider = authProviders.find(p => p.id === AuthProviderId.PhoneNumber);
      this.isVerified = true;
    } else {
      this.authProvider = authProviders.find(p => p.id === this.user.providerId);
      this.isVerified = user.emailVerified;
    }
  }
}
