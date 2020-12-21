import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { AuthProviderId } from '../enums';
import { IonngxFirebaseAuthUiService } from '../services/ionngx-firebase-auth-ui.service';
import { AuthProvider } from '../models';
import { IonngxFirebaseAuthUiConfig, IonngxFirebaseAuthUiConfigToken } from '../config';
import { NavigatorService } from '../services/navigator.service';
import { ProviderService } from '../services/provider.service';

@Component({
  selector: 'ionngx-firebase-auth-ui-provider-stack',
  templateUrl: './provider-stack.component.html',
  styleUrls: ['./provider-stack.component.scss'],
})
export class ProviderStackComponent implements OnChanges {
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
      this.providers = this.providerService.prepareProviders(
        this.config.providers,
        this.hideEmailPasswordButton
      );
    }
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
