import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';


/**
 * Generated class for the BookingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-booking',
  templateUrl: 'booking.html',
})
export class BookingPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public datePicker: DatePicker
  ) {
  }

  openDateChooser() {
    // let myDataChooserModal = this.modalCtrl.create('DateChooserModalPage', { data: { pickMode: 'single' } });
    // myDataChooserModal.onDidDismiss(data => {
    //   console.log(data);
    // });
    // myDataChooserModal.present();
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got date: ', date),
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  openTimeChooser() {
    this.datePicker.show({
      date: new Date(),
      mode: 'time',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => console.log('Got time: ', date),
      err => console.log('Error occurred while getting date: ', err)
      );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BookingPage');
  }

}
