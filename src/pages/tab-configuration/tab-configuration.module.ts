import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabConfigurationPage } from './tab-configuration';

@NgModule({
  declarations: [
    TabConfigurationPage,
  ],
  imports: [
    IonicPageModule.forChild(TabConfigurationPage),
  ],
})
export class TabConfigurationPageModule {}
