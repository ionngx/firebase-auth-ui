import { Component, Input, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

import { User } from '../models';
import { AvatarMenuLinkItem } from './avatar-menu-link-item';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';
import { DisplayNameLocation } from '../enums/display-name-location';


@Component({
  selector: 'ionngx-firebase-auth-ui-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
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

  public user: User;

  constructor(private service: IonngxFirebaseAuthUiService, private popoverController: PopoverController) { }

  public enableInteraction(): boolean {
    return (
      this.mode === 'default' &&
      ((!this.user && (this.canSignIn || this.canSignUp)) ||
        (this.user && (this.canSignOut || this.canViewProfile)) ||
        (this.additionalLinks && this.additionalLinks.length > 0))
    );
  }

  public ngOnInit(): void {
    this.service.user$.subscribe((user: User) => {
      this.user = user;
    });
  }

  public async showMenu(evt: any): Promise<void> {
    const popover = await this.popoverController.create({
      component: AvatarMenuComponent,
      componentProps: {
        additionalLinks: this.additionalLinks,
        canSignIn: this.canSignIn,
        canSignOut: this.canSignOut,
        canViewProfile: this.canViewProfile,
        user: this.user
      },
      event: evt
    });

    return await popover.present();
  }
}
