import { Inject, Injectable } from '@angular/core';
import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../config';
import { authProviders } from '../data/auth-providers';
import { AuthProviderId } from '../enums';
import { AuthProvider } from '../models';

@Injectable()
export class ProviderService {
  constructor(
    @Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig
  ) {}

  public prepareProviders(providers: AuthProviderId | AuthProviderId[], hideEmailPassword: boolean = true): AuthProvider[] {
    const result: AuthProvider[] = [];
    if (!Array.isArray(providers)) {
      if (providers === AuthProviderId.ALL) {
        this.prepareAllProviders(result);
      }

      if (providers !== AuthProviderId.Anonymous) {
        this.addProviderById(providers, result);
      }
    } else {
      console.table(providers);
      for (const providerId of providers) {
        if (
          providerId === AuthProviderId.ALL ||
          providerId === AuthProviderId.Anonymous ||
          (providerId === AuthProviderId.EmailAndPassword && hideEmailPassword)
        ) {
          continue;
        }
        this.addProviderById(providerId, result);
      }
    }

    return result;
  }

  private prepareAllProviders(result: AuthProvider[]): void {
    this.addProviderById(AuthProviderId.Apple, result);
    this.addProviderById(AuthProviderId.EmailAndPassword, result);
    this.addProviderById(AuthProviderId.Facebook, result);
    this.addProviderById(AuthProviderId.Github, result);
    this.addProviderById(AuthProviderId.Google, result);
    this.addProviderById(AuthProviderId.Microsoft, result);
    this.addProviderById(AuthProviderId.PhoneNumber, result);
    this.addProviderById(AuthProviderId.Twitter, result);
    this.addProviderById(AuthProviderId.Yahoo, result);
  }

  private addProviderById(id: AuthProviderId, result: AuthProvider[]): void {
    const provider = authProviders.find((v: AuthProvider) => v.id === id);
    if (provider) {
      result.push(provider);
    }
  }
}
