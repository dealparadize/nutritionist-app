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
	var _this_ = this;
    userId.then(function(ids){
	  devicekey = ids.userId
	  console.log("devicekey");
	  console.log(devicekey);
	  
      if (form.valid) {
        _this_.userProvider.login(_this_.login.email, _this_.login.pin,devicekey)
          .do(res => console.log(res.json()))
          .map(res => res.json())
          .subscribe(data => {
			console.log("user");
			console.log(data);
            let user = data;
            _this_.messageProvider.toast('Bienvenido a Nutritionist app');
            _this_.userProvider.setUser(user).then(data => {
				_this_.events.publish('user:login');
				_this_.navCtrl.setRoot('TabsPage');
            });
            
          });
      } else {
        
        _this_.submitted = true;
        _this_.messageProvider.toast('Error al iniciar sesión');
      }
    });
  }

  onSignup() {
    this.navCtrl.push('SignupPage');
  }
}
