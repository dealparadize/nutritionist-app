import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DateChooserPage } from './date-chooser';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    DateChooserPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(DateChooserPage),
  ],
})
export class DateChooserPageModule {}
