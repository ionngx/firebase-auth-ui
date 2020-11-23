import { ModuleWithProviders, NgModule } from '@angular/core';
import { FirebaseAppConfig, FIREBASE_APP_NAME, FIREBASE_OPTIONS } from '@angular/fire';

import { NavigatorService } from './services/navigator.service';
import { ConfigOverridesToken, ionngxFirebaseAuthUiConfigFactory, IonngxFirebaseAuthUiConfigToken, IonngxFirebaseAuthUiConfig } from './config';
import { SignInModule } from './sign-in';

@NgModule({
  exports: [],
  declarations: [],
  imports: [SignInModule],
  providers: [NavigatorService]
})
export class IonngxFirebaseAuthUiModule {
  static forRoot(
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
        }
        // AuthProcessService,
        // FirestoreSyncService,
        // LoggedInGuard
      ],
    };
  }
}
