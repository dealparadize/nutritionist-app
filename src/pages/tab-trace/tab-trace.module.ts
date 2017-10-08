import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TabTracePage } from './tab-trace';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    TabTracePage,
  ],
  imports: [
    CalendarModule,    
    IonicPageModule.forChild(TabTracePage),
  ],
})
export class TabTracePageModule {}
