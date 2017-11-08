import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { CalendarComponentOptions } from 'ion2-calendar'
import * as moment from "moment";

/**
 * Generated class for the DateChooserModalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-date-chooser-modal',
  templateUrl: 'date-chooser-modal.html',
})
export class DateChooserModalPage {

  date: any;
  type: 'string';
  options: CalendarComponentOptions = {
    from: new Date(2010, 0, 1),
    to: new Date()
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {

    console.log(this.viewCtrl.data.data);

    let from = this.viewCtrl.data.data.from;

    if (from) {
      this.options.from = from;
    }

    let to = this.viewCtrl.data.data.to;

    if (to) {
      this.options.to = to;
    }

    let date = this.viewCtrl.data.data.date;

    if (date) {
      this.date = moment(date);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DateChooserModalPage');
  }

  onChange() {
    // console.log(this.date);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  dismissData() {
    if (this.date)
      this.viewCtrl.dismiss(this.date.toDate());
  }

}
