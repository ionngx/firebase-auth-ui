import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { authProviders } from '../data/auth-providers';

import { AuthProviderId } from '../enums';
import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';
import { AuthProvider } from '../models/auth-provider';

@Component({
  selector: 'ionngx-firebase-auth-ui-provider-bar',
  templateUrl: './provider-bar.component.html',
  styleUrls: ['./provider-bar.component.scss'],
})
export class ProviderBarComponent implements OnInit {
  @Input()
  public buttonColor: 'primary' | 'secondary' | 'tertiary' | 'light' | 'medium' | 'dark' | 'success' | 'warning' | 'danger' = "primary";

  @Input()
  public hideEmailPasswordButton: boolean = true;

  @Output()
  public emailPasswordSelected: EventEmitter<void> = new EventEmitter<void>();

  public providers: AuthProvider[] = [];

  constructor(private service: IonngxFirebaseAuthUiService) {}

  public ngOnInit(): void {
    this.prepareProviders(this.service.currentConfig.providers);
  }

  public signIn(provider: AuthProviderId): void {
    if (provider === AuthProviderId.EmailAndPassword) {
      this.emailPasswordSelected.emit();
      return;
    }
    this.service.processSignIn(provider);
  }

  public visibleProviders(): AuthProvider[] {
    return this.providers.filter((p: AuthProvider) => p.id !== AuthProviderId.EmailAndPassword || !this.hideEmailPasswordButton);
  }

  private prepareProviders(providers: AuthProviderId | AuthProviderId[]): void {
    if (!Array.isArray(providers)) {
      if (providers === AuthProviderId.ALL) {
        this.prepareAllProviders();
      }

      if (providers !== AuthProviderId.Anonymous) {
        this.addProviderById(providers);
      }
    } else {
      console.table(providers);
      for (const providerId of providers) {
        if (
          providerId === AuthProviderId.ALL ||
          providerId === AuthProviderId.Anonymous ||
          (providerId === AuthProviderId.EmailAndPassword && this.hideEmailPasswordButton)
        ) {
          continue;
        }
        this.addProviderById(providerId);
      }
    }
  }

  private prepareAllProviders(): void {
    this.addProviderById(AuthProviderId.Apple);
    this.addProviderById(AuthProviderId.EmailAndPassword);
    this.addProviderById(AuthProviderId.Facebook);
    this.addProviderById(AuthProviderId.Github);
    this.addProviderById(AuthProviderId.Google);
    this.addProviderById(AuthProviderId.Microsoft);
    this.addProviderById(AuthProviderId.PhoneNumber);
    this.addProviderById(AuthProviderId.Twitter);
    this.addProviderById(AuthProviderId.Yahoo);
  }

  private addProviderById(id: AuthProviderId): void {
    const provider = authProviders.find((v: AuthProvider) => v.id === id);
    if (provider) {
      this.providers.push(provider);
    }
  }
}
