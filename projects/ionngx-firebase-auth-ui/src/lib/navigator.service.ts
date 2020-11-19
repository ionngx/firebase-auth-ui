
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class NavigatorService {

  constructor( @Inject(PLATFORM_ID) private platformId: any){}

  public navigateToExternalUrl(url: string): void {
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }
}
