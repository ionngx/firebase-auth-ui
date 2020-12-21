import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IonInput, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import firebase from 'firebase/app';

import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';

@Component({
  selector: 'ionngx-firebase-auth-ui-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  private displayNameInput: HTMLInputElement;
  private originalDisplayName: string;
  private originalPhotUrl: string;
  private photoUrlInput: HTMLInputElement;
  private subscriptions: Subscription[] = [];

  @Input()
  public isModal: boolean = false;

  @ViewChild('displayNameInput', {static: false})
  public displayNameInputRef: IonInput;

  @ViewChild('photoUrlInput', {static: false})
  public photeUrlElementRef: IonInput;

  public cancelLabel: string;
  public displayName: string;
  public displayNameLabel: string;
  public isEditingDisplayName: boolean = false;
  public isEditingPhotoUrl: boolean = false;
  public photoUrl: string;
  public photoUrlLabel: string;
  public userProfileLabel: string;
  public userProfileMessage: string;

  constructor(
    private service: IonngxFirebaseAuthUiService,
    private modalController: ModalController
  ) {}

  public async cancel(): Promise<boolean> {
    return await this.modalController.dismiss();
  }

  public cancelEditDisplayName(): void {
    this.displayName = this.originalDisplayName;
    this.isEditingDisplayName = false;
  }

  public cancelEditPhotoUrl(): void {
    this.photoUrl = this.originalPhotUrl;
    this.isEditingPhotoUrl = false;
  }

  public editDisplayName(): void {
    this.originalDisplayName = this.displayName;
    this.isEditingDisplayName = true;
    this.displayNameInput.focus();
    this.displayNameInput.select();
  }

  public editPhotoUrl(): void {
    this.originalPhotUrl = this.photoUrl;
    this.isEditingPhotoUrl = true;
    this.photoUrlInput.focus();
    this.photoUrlInput.select();
  }

  public async ngAfterViewInit(): Promise<void> {
    this.displayNameInput = await this.displayNameInputRef.getInputElement();
    this.photoUrlInput = await this.photeUrlElementRef.getInputElement();
  }

  public ngOnDestroy(): void {
    for (const subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

  public async ngOnInit(): Promise<void> {
    this.service.user$.subscribe(this.handleUserUpdate);

    const stringResources = this.service.currentConfig.stringResources;
    this.cancelLabel = stringResources.cancel;
    this.displayNameLabel = stringResources.displayName;
    this.photoUrlLabel = stringResources.photoUrl;
    this.userProfileLabel = stringResources.userProfile;
    this.userProfileMessage = stringResources.userProfileMessage;
  }

  public saveDisplayName(): void {
  }

  public savePhotoUrl(): void {
  }

  private handleUserUpdate = (user: firebase.User): void => {
    if(!user.isAnonymous) {
      this.displayName = user.displayName;
      this.photoUrl = user.photoURL;
    }
  }
}
