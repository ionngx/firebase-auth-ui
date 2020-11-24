import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FirebaseAppConfig, FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire';
import { IonicModule } from '@ionic/angular';

import { NavigatorService } from './services/navigator.service';
import {
  ConfigOverridesToken,
  ionngxFirebaseAuthUiConfigFactory,
  IonngxFirebaseAuthUiConfigToken,
  IonngxFirebaseAuthUiConfig,
} from './config';
import { ModalService } from './services/modal.service';
import { AvatarComponent } from './avatar/avatar.component';
import { AvatarMenuComponent } from './avatar/avatar-menu/avatar-menu.component';
import { ProviderBarComponent } from './provider-bar/provider-bar.component';
import { ProviderStackComponent } from './provider-stack/provider-stack.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const COMPONENTS = [
  AvatarComponent,
  AvatarMenuComponent,
  ProviderBarComponent,
  ProviderStackComponent,
  SignInComponent,
  SignUpComponent,
];
@NgModule({
  declarations: COMPONENTS,
  exports: COMPONENTS,
  imports: [CommonModule, FormsModule, IonicModule],
  providers: [NavigatorService, ModalService],
})
export class IonngxFirebaseAuthUiModule {
  public static forRoot(
    firebaseConfig: FirebaseAppConfig,
    appNameFactory: () => string | undefined = () => undefined,
    config: IonngxFirebaseAuthUiConfig = {}
  ): ModuleWithProviders<IonngxFirebaseAuthUiModule> {
    return {
      ngModule: IonngxFirebaseAuthUiModule,
      providers: [
        {
          provide: FIREBASE_OPTIONS,
          useValue: firebaseConfig,
        },
        {
          provide: FIREBASE_APP_NAME,
          useFactory: appNameFactory,
        },
        { provide: ConfigOverridesToken, useValue: config },
        {
          provide: IonngxFirebaseAuthUiConfigToken,
          useFactory: ionngxFirebaseAuthUiConfigFactory,
          deps: [ConfigOverridesToken],
        },
        // AuthProcessService,
        // FirestoreSyncService,
        // LoggedInGuard
      ],
    };
  }

  public static forChild(): ModuleWithProviders<IonngxFirebaseAuthUiModule> {
    return { ngModule: IonngxFirebaseAuthUiModule, providers: [] };
  }
}
