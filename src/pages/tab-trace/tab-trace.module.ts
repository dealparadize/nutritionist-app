import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabTracePage } from './tab-trace';

@NgModule({
  declarations: [
    TabTracePage,
  ],
  imports: [
    IonicPageModule.forChild(TabTracePage),
  ],
})
export class TabTracePageModule {}
