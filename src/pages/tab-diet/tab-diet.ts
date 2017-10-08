import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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


  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.groups = [
      {
        time: "08:00",
        foods: [
          {
            name: "Huevito con catsun",
            quantity: "200",
            unit: "gr",
            mode: "Guisado"
          },
          {
            name: "Fresa",
            quantity: "100",
            unit: "gr",
            mode: "Natural"
          },
          {
            name: "Pan",
            quantity: "300",
            unit: "gr",
            mode: "Tostado"
          }

        ]
      },
      {
        time: "12:00",
        foods: [
          {
            name: "Zanahoria",
            quantity: "50",
            unit: "gr",
            mode: "Natural"
          },
          {
            name: "Yogurt",
            quantity: "200",
            unit: "gr",
            mode: "Natural"
          }

        ]
      },
      {
        time: "14:00",
        foods: [
          {
            name: "Pechuga",
            quantity: "400",
            unit: "gr",
            mode: "A la plancha"
          },
          {
            name: "Lechuga",
            quantity: "200",
            unit: "gr",
            mode: "Natural"
          },
          {
            name: "Arroz",
            quantity: "300",
            unit: "gr",
            mode: "Guisado"
          }
        ]
      },
      {
        time: "18:00",
        foods: [
          {
            name: "Huevito con catsun",
            quantity: "200",
            unit: "gr",
            mode: "Guisado"
          },
          {
            name: "Platano",
            quantity: "100",
            unit: "gr",
            mode: "Natural"
          }
        ]
      }
    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabDietPage');
  }

  openDateChooser(){
    this.navCtrl.push('DateChooserPage');
  }

}
