import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { UserProvider } from "../../providers/user.provider";
import { MessageProvider } from "../../providers/message.provider";
import { OneSignal } from '@ionic-native/onesignal';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
export interface UserOptions {
  email?: string,
  pin?: number
}

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  login: UserOptions = { email: '', pin: undefined };
  submitted = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public userProvider: UserProvider,
    public messageProvider: MessageProvider,
    private oneSignal: OneSignal,
    public events: Events
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onLogin(form: NgForm) {
    var userId = this.oneSignal.getIds();
    var devicekey;
    userId.then(function(ids){
      devicekey = ids.userId
      console.log(devicekey);
    });
    if (form.valid) {
      this.userProvider.login(this.login.email, this.login.pin,devicekey)
        .do(res => console.log(res.json()))
        .map(res => res.json())
        .subscribe(data => {
          let user = data[0];
          this.messageProvider.toast('Bienvenido a Nutritionist app');
          this.userProvider.setUser(user).then(data => {
            this.events.publish('user:login');
            this.navCtrl.setRoot('TabsPage');
          });
          this.userProvider.setDeviceKey(devicekey).then(data => {})//guarda devicekey
        });
    } else {
      
      this.submitted = true;
      this.messageProvider.toast('Error al iniciar sesión');
    }
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }

}
