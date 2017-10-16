import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the MenuChooserModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu-chooser-modal',
  templateUrl: 'menu-chooser-modal.html',
})
export class MenuChooserModalPage {

  items: Array<any> = [
    {
      title: "Menu 1",
      foods: [
        "Atún",
        "Huevo",
        "Fresa",
        "Avena",
      ]
    },
    {
      title: "Menu 2",
      foods: [
        "Catsun",
        "Huevo",
        "Platano",
        "Almendra",
      ]
    },
    {
      title: "Menu 3",
      foods: [
        "Papaya",
        "Cacahuate",
        "Pan",
        "Mantequilla",
      ]
    }
  ]

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
  }

  closeDateChooser() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuChooserModalPage');
  }

}
