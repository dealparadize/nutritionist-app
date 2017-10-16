import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabTracePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-trace',
  templateUrl: 'tab-trace.html',
})
export class TabTracePage {

  items: Array<any> = [
    {
      name: "Peso actual",
      value: "92"
    },
    {
      name: "Peso ideal",
      value: "67"
    },
    {
      name: "% Peso ideal",
      value: "136"
    },
    {
      name: "Complexión",
      value: "11"
    },
    {
      name: "Tipo complexión",
      value: "Mediana"
    },
    {
      name: "ICC",
      value: "0.8"
    },{
      name: "IMC",
      value: "31"
    },
    {
      name: "AMBd",
      value: "32"
    },
    {
      name: "MMT",
      value: "23"
    },
    {
      name: "% Grasa",
      value: "28"
    },
    {
      name: "Masa grasa",
      value: "26"
    },
    {
      name: "% Grasa extra",
      value: "10"
    },
    {
      name: "Masa grasa ex",
      value: "9"
    },
    {
      name: "Masa osea",
      value: "44"
    }
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  openChart(){
    this.navCtrl.push('ChartTestPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabTracePage');
  }

}
