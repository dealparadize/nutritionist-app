import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateChooserModalPage } from './date-chooser-modal';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    DateChooserModalPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(DateChooserModalPage),
  ],
})
export class DateChooserModalPageModule {}
