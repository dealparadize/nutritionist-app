import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MenuChooserModalPage } from './menu-chooser-modal';

@NgModule({
  declarations: [
    MenuChooserModalPage,
  ],
  imports: [
    IonicPageModule.forChild(MenuChooserModalPage),
  ],
})
export class MenuChooserModalPageModule {}
