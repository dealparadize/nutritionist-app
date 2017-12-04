import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Tab {
  title: string,
  component: string,
  icon: string,
  badge?: number
};


@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tabs: Array<Tab> = [
    { title: 'TAB_DIET', component: 'TabDietPage', icon: 'home' },
    { title: 'TAB_TRACE', component: 'TabTracePage', icon: 'walk' },
    { title: 'TAB_NOTIFICATION', component: 'TabNotificationPage', icon: 'notifications', /*badge: 2*/ },
    { title: 'TAB_CONFIGURATION', component: 'TabConfigurationPage', icon: 'cog' },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }

}
