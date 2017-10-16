import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the TabDietPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-diet',
  templateUrl: 'tab-diet.html',
})
export class TabDietPage {

  groups: any = [];


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController
  ) {

    this.groups = [
      {
        time: "Desayuno",
        foods: [
          {
            name: "Huevito con catsun",
            quantity: "200",
            unit: "gr",
            mode: "Guisado",
            img: "https://source.unsplash.com/featured/?{food},{egg}"
          },
          {
            name: "Fresa",
            quantity: "100",
            unit: "gr",
            mode: "Natural",
            img: "https://source.unsplash.com/featured/?{food},{strawberry}"
          },
          {
            name: "Pan",
            quantity: "300",
            unit: "gr",
            mode: "Tostado",
            img: "https://source.unsplash.com/featured/?{food},{bread}"
          }

        ]
      },
      {
        time: "Colación",
        foods: [
          {
            name: "Zanahoria",
            quantity: "50",
            unit: "gr",
            mode: "Natural",
            img: "https://source.unsplash.com/featured/?{food},{carrot}"
          },
          {
            name: "Yogurt",
            quantity: "200",
            unit: "gr",
            mode: "Natural",
            img: "https://source.unsplash.com/featured/?{food},{yogurt}"
          }

        ]
      },
      {
        time: "Comida",
        foods: [
          {
            name: "Pechuga",
            quantity: "400",
            unit: "gr",
            mode: "A la plancha",
            img: "https://source.unsplash.com/featured/?{food},{chicken}"
          },
          {
            name: "Lechuga",
            quantity: "200",
            unit: "gr",
            mode: "Natural",
            img: "https://source.unsplash.com/featured/?{food},{green}"
          },
          {
            name: "Arroz",
            quantity: "300",
            unit: "gr",
            mode: "Guisado",
            img: "https://source.unsplash.com/featured/?{food},{rice}"
          }
        ]
      },
      {
        time: "Cena",
        foods: [
          {
            name: "Huevito con catsun",
            quantity: "200",
            unit: "gr",
            mode: "Guisado",
            img: "https://source.unsplash.com/featured/?{food},{egg}"
          },
          {
            name: "Platano",
            quantity: "100",
            unit: "gr",
            mode: "Natural",
            img: "https://source.unsplash.com/featured/?{food},{banana}"
          }
        ]
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabDietPage');
  }

  chooseMenu() {
    let myDataChooserModal = this.modalCtrl.create('MenuChooserModalPage', { data: "No data" });
    myDataChooserModal.onDidDismiss(data => {
      console.log(data);
    });
    myDataChooserModal.present();
  }

  openDateChooser() {
    let myDataChooserModal = this.modalCtrl.create('DateChooserModalPage', { data: { pickMode: 'single' } });
    myDataChooserModal.onDidDismiss(data => {
      console.log(data);
    });
    myDataChooserModal.present();
  }

}
