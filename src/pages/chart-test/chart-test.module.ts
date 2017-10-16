import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChartTestPage } from './chart-test';

@NgModule({
  declarations: [
    ChartTestPage,
  ],
  imports: [
    IonicPageModule.forChild(ChartTestPage),
  ],
})
export class ChartTestPageModule {}
