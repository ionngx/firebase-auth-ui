import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpComponent } from './sign-up.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [SignUpComponent],
  exports: [SignUpComponent, FormsModule],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ]
})
export class SignUpModule { }
