import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
/**
 * Generated class for the TabConfigurationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tab-configuration',
  templateUrl: 'tab-configuration.html',
})
export class TabConfigurationPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider
  ) {
  }

  user: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabConfigurationPage');
  }

  ionViewWillEnter() {
    this.userProvider.getUser()
      .then(data => {
        this.user = data.user;
        console.log("useeeeeeeer", this.user);
      })
  }

}
