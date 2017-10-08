import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BookingPage } from './booking';
import { CalendarModule } from "ion2-calendar";

@NgModule({
  declarations: [
    BookingPage,
  ],
  imports: [
    CalendarModule,
    IonicPageModule.forChild(BookingPage),
  ],
})
export class BookingPageModule {}
