import { Component, Inject, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import firebase from 'firebase/app';

import { NavigatorService } from '../../services/navigator.service';
import { AvatarMenuLinkItem } from '../avatar-menu-link-item';
import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../../config';
import { AuthProvider } from '../../models';
import { AuthProviderId } from '../../enums';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'ionngx-firebase-auth-ui-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
})
export class AvatarMenuComponent {
  @Input()
  public additionalLinks: AvatarMenuLinkItem[] = [];

  @Input()
  public canSignIn = true;

  @Input()
  public canSignOut = true;

  @Input()
  public canSignUp = true;

  @Input()
  public canViewProfile = true;

  @Input()
  public user: firebase.User;

  @Input()
  public authProvider: AuthProvider;

  public signInLabel = 'Sign In';

  public signOutLabel = 'Sign Out';

  public signUpLabel = 'Sign Up';

  public viewProfileLabel = 'Profile';

  public get displayName(): string {
    if(this.authProvider.id !== AuthProviderId.PhoneNumber) {
      return this.user.displayName;
    }

    return `TEL: ...${this.user.phoneNumber.substr(this.user.phoneNumber.length - 5, 4)}`;
  }

  constructor(
    @Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig,
    private router: Router,
    private navigatorService: NavigatorService,
    private popoverController: PopoverController
  ) {
    const stringResources = this.config.stringResources;
    this.signInLabel = stringResources.signIn;
    this.signOutLabel = stringResources.signOut;
    this.signUpLabel = stringResources.signUp;
    this.viewProfileLabel = stringResources.profile;
  }

  public handleMenuLinkClick(link: AvatarMenuLinkItem): void {
    if (link.routerLink) {
      const route = Array.isArray(link.routerLink) ? link.routerLink : [link.routerLink];
      this.router.navigate(route);
    } else if (link.externalUrl) {
      this.navigatorService.navigateToExternalUrl(link.externalUrl);
    }

    if (link.callback) {
      link.callback(link.data);
    }
  }

  public viewProfile(): Promise<void> {
    this.popoverController.dismiss();
    return this.navigatorService.viewProfile();
  }

  public signIn(): Promise<void> {
    this.popoverController.dismiss();
    return this.navigatorService.signIn();
  }

  public signUp(): Promise<void> {
    this.popoverController.dismiss();
    return this.navigatorService.signUp();
  }

  public signOut(): Promise<void> {
    this.popoverController.dismiss();
    return this.navigatorService.signOut();
  }
}
