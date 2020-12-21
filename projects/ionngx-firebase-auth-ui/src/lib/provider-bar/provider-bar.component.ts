import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import { AuthProviderId } from '../enums';
import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';
import { AuthProvider } from '../models/auth-provider';
import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../config';
import { NavigatorService } from '../services/navigator.service';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'ionngx-firebase-auth-ui-provider-bar',
  templateUrl: './provider-bar.component.html',
  styleUrls: ['./provider-bar.component.scss'],
})
export class ProviderBarComponent implements OnChanges, OnInit {
  @Input()
  public buttonColor:
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'light'
    | 'medium'
    | 'dark'
    | 'success'
    | 'warning'
    | 'danger' = 'primary';

  @Input()
  public hideEmailPasswordButton: boolean = true;

  @Output()
  public emailPasswordSelected: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public phoneSelected: EventEmitter<void> = new EventEmitter<void>();

  public providers: AuthProvider[] = [];

  constructor(
    @Inject(IonngxFirebaseAuthUiConfigToken) private config: IonngxFirebaseAuthUiConfig,
    private navigatorService: NavigatorService,
    private service: IonngxFirebaseAuthUiService,
    private providerService: ProviderService
  ) {}

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.hideEmailPasswordButton) {
      this.loadProviders();
    }
  }

  private loadProviders() {
    this.providers = this.providerService.prepareProviders(
      this.config.providers,
      this.hideEmailPasswordButton
    );
  }

  public ngOnInit(): void {
    this.loadProviders();
  }

  public async signIn(provider: AuthProviderId): Promise<void> {
    if (provider === AuthProviderId.EmailAndPassword) {
      if (this.emailPasswordSelected.observers && this.emailPasswordSelected.observers.length) {
        this.emailPasswordSelected.emit();
        return Promise.resolve();
      } else {
        return this.navigatorService.signIn();
      }
    }

    if (provider === AuthProviderId.PhoneNumber) {
      if (this.phoneSelected.observers && this.phoneSelected.observers.length) {
        this.phoneSelected.emit();
        return Promise.resolve();
      } else {
        return this.navigatorService.signInWithPhoneNumber();
      }
    }

    return this.service.signIn(provider);
  }

  public visibleProviders(): AuthProvider[] {
    return this.providers.filter(
      (p: AuthProvider) => p.id !== AuthProviderId.EmailAndPassword || !this.hideEmailPasswordButton
    );
  }
}
