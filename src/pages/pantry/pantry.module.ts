import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PantryPage } from './pantry';

@NgModule({
  declarations: [
    PantryPage,
  ],
  imports: [
    IonicPageModule.forChild(PantryPage),
  ],
})
export class PantryPageModule {}
