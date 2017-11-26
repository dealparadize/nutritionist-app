import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { CalendarModule } from "ion2-calendar";
import { DatePicker } from '@ionic-native/date-picker';
import { Chart } from 'chart.js';
import { OneSignal } from '@ionic-native/onesignal';
import { MyApp } from './app.component';

import { HttpModule } from "@angular/http";
import { IonicStorageModule } from '@ionic/storage';

import { ApiProvider } from "../providers/api.provider";
import { UserProvider } from "../providers/user.provider";
import { MessageProvider } from "../providers/message.provider";

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    CalendarModule,
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    DatePicker,
    StatusBar,
    SplashScreen,
    OneSignal,
    ApiProvider,
    UserProvider,
    MessageProvider,

    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
