import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AvatarMenuComponent } from './avatar-menu/avatar-menu.component';
import { AvatarComponent } from './avatar.component';

@NgModule({
  declarations: [AvatarComponent, AvatarMenuComponent],
  exports: [AvatarComponent],
  imports: [CommonModule, FormsModule, IonicModule]
})
export class AvatarModule {
}
