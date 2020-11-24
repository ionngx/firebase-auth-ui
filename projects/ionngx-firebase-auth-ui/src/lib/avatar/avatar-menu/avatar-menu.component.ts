import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';

import { IonngxFirebaseAuthUiService } from '../../services/ionngx-firebase-auth-ui.service';
import { User } from '../../models';
import { NavigatorService } from '../../services/navigator.service';
import { AvatarMenuLinkItem } from '../avatar-menu-link-item';

@Component({
  selector: 'ionngx-firebase-auth-ui-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss']
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
  public user: User;

  public signInLabel = 'Sign In';

  public signOutLabel = 'Sign Out';

  public signUpLabel = 'Sign Up';

  public viewProfileLabel = 'Profile';

  constructor(private service: IonngxFirebaseAuthUiService,
              private router: Router,
              private navigator: NavigatorService,
              private popoverController: PopoverController) {

    const config = this.service.currentConfig;
    this.signInLabel = config.stringResources.signIn;
    this.signOutLabel = config.stringResources.signOut;
    this.signUpLabel = config.stringResources.signUp;
    this.viewProfileLabel = config.stringResources.profile;
  }

  public handleMenuLinkClick(link: AvatarMenuLinkItem): void {
    if (link.routerLink) {
      const route = Array.isArray(link.routerLink) ? link.routerLink : [link.routerLink];
      this.router.navigate(route);
    } else if (link.externalUrl) {
      this.navigator.navigateToExternalUrl(link.externalUrl);
    }

    if (link.callback) {
      link.callback(link.data);
    }
  }

  public async viewProfile(): Promise<void> {
    await this.popoverController.dismiss();
    await this.service.viewProfile();
  }

  public async signIn(): Promise<void> {
    await this.popoverController.dismiss();
    await this.service.signIn();
  }

  public async signUp(): Promise<void> {
    await this.popoverController.dismiss();
    await this.service.signUp();
  }

  public async signOut(): Promise<void> {
    try {
      await this.popoverController.dismiss();
      await this.service.signOut();
    } catch (e) {
      console.error('An error happened while signing out!', e);
    }
  }
}
