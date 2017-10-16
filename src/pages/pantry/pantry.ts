import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the PantryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pantry',
  templateUrl: 'pantry.html',
})
export class PantryPage {
  items: Array<any> = [
    {
      name: "Huevo",
      quantity: "900gr"
    },
    {
      name: "Pechuga de Pollo",
      quantity: "1200gr"
    },
    {
      name: "Platano",
      quantity: "800gr"
    },
    {
      name: "Fresa",
      quantity: "100gr"
    },
    {
      name: "Catsun",
      quantity: "10000gr"
    }
  ]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {
  }

  chooseMenu() {
    let myDataChooserModal = this.modalCtrl.create('MenuChooserModalPage', { data: "No data" });
    myDataChooserModal.onDidDismiss(data => {
      console.log(data);
    });
    myDataChooserModal.present();
  }

  openDateChooser() {
    let myDataChooserModal = this.modalCtrl.create('DateChooserModalPage', { data: { pickMode: 'range' } });
    myDataChooserModal.onDidDismiss(data => {
      console.log(data);
    });
    myDataChooserModal.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PantryPage');
  }

}
