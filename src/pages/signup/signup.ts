import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ModalController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from "@angular/forms";


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  myForm: FormGroup;
  _next: boolean = false;
  myDate: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public formBuilder: FormBuilder,
    public modalController: ModalController
  ) {
    this.myDate = new Date(1971, 0, 1).toISOString().slice(0, 10);
    this.myForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastname: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      lastname2: ['', Validators.compose([Validators.required, Validators.maxLength(50)])],
      email: ['', Validators.compose([Validators.required, Validators.email, Validators.maxLength(50)])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(7), Validators.maxLength(15), Validators.pattern(/^\d+$/)])],
      gender: ['m', Validators.compose([Validators.required])],
      // date: ['', Validators.compose([Validators.required])],
      q1: ['', Validators.compose([Validators.required])],
      q2: ['', Validators.compose([])],
      q3: ['', Validators.compose([])],
      q4: ['', Validators.compose([])],
      q5: ['', Validators.compose([])],
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  openDateChooser() {
    console.log(this.myDate)
    let modal = this.modalController.create('DateChooserModalPage', { data: { date: this.myDate, to: new Date(2012, 0, 1), from: new Date(1970, 0, 1) } });
    modal.present();
    modal.onDidDismiss((data) => {
      console.log(data);
      if (!data) return;
      this.myDate = new Date(data).toISOString().slice(0, 10);
    });
  }

  next() {
    this._next = true;
  }

  onSignup() {
    console.log(this.myForm.value);
    console.log(this.myDate);
  }

}
