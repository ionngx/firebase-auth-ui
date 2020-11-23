import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { ProviderStackComponent } from './provider-stack.component';

@NgModule({
  declarations: [ProviderStackComponent],
  exports: [ProviderStackComponent],
  imports: [
    CommonModule,
    IonicModule
  ]
})
export class ProviderStackModule { }
