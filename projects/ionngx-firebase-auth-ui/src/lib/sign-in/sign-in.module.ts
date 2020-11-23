import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInComponent } from './sign-in.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ProviderBarModule } from '../provider-bar';
import { ProviderStackModule } from '../provider-stack';

@NgModule({
  declarations: [SignInComponent],
  exports: [SignInComponent, ProviderBarModule, ProviderStackModule, FormsModule],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProviderBarModule,
    ProviderStackModule
  ]
})
export class SignInModule { }
