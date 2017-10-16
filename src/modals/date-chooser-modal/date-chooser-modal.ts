import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CalendarComponentOptions } from "ion2-calendar";

/**
 * Generated class for the DateChooserModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-chooser-modal',
  templateUrl: 'date-chooser-modal.html',
})
export class DateChooserModalPage {
  dateMulti: string[];
  type: 'string'; // 'string' | 'js-date' | 'moment' | 'time' | 'object'
  optionsMulti: CalendarComponentOptions;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    console.log()

    this.optionsMulti = {
      pickMode: this.viewCtrl.data.data.pickMode ? this.viewCtrl.data.data.pickMode : 'single'
    };


  }

  closeDateChooser() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateChooserModalPage');
  }

}
