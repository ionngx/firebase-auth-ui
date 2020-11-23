import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProviderBarComponent } from './provider-bar.component';

@NgModule({
  declarations: [ProviderBarComponent],
  exports: [ProviderBarComponent],
  imports: [CommonModule, IonicModule],
})
export class ProviderBarModule {}
