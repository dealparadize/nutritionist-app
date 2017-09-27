import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabDietPage } from './tab-diet';

@NgModule({
  declarations: [
    TabDietPage,
  ],
  imports: [
    IonicPageModule.forChild(TabDietPage),
  ],
})
export class TabDietPageModule {}
