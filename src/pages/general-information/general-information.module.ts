import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GeneralInformationPage } from './general-information';

@NgModule({
  declarations: [
    GeneralInformationPage,
  ],
  imports: [
    IonicPageModule.forChild(GeneralInformationPage),
  ],
})
export class GeneralInformationPageModule {}
