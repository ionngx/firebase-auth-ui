import { InjectionToken } from '@angular/core';

import { defaultConfig } from './default-config';
import { IonngxFirebaseAuthUiConfig } from './ionngx-firebase-auth-ui-config';

/**
 * Creates final configuration from defaults and input
 *
 * @export
 * @param config Configuration settings to use
 * @return Configuration input merged with defaults where settings not specified
 */
export function ionngxFirebaseAuthUiConfigFactory(
    config: IonngxFirebaseAuthUiConfig
): IonngxFirebaseAuthUiConfig {
    return Object.assign({}, defaultConfig, config);
}

/**
 * @ignore
 */
export const IonngxFirebaseAuthUiConfigToken: InjectionToken<IonngxFirebaseAuthUiConfig> =
  new InjectionToken<IonngxFirebaseAuthUiConfig>('IonngxFirebaseAuthUiConfigToken');

/**
 * @ignore
 */
export const ConfigOverridesToken: InjectionToken<string | IonngxFirebaseAuthUiConfig> =
  new InjectionToken<string | IonngxFirebaseAuthUiConfig>('ConfigOverridesToken');
