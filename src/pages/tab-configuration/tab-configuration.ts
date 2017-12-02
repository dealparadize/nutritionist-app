import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
import { Camera, CameraOptions } from '@ionic-native/camera';

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
    public userProvider: UserProvider,
    public camera: Camera,
    public events: Events    
  ) {
  }

  user: any;
  img: any;

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabConfigurationPage');
  }

  ionViewWillEnter() {
    this.userProvider.getUser()
      .then(data => {
        this.user = data.user;
      })

      this.userProvider.getImage()
      .then(data=>{
        this.img = data;
      });
  }

  getPicture() {

    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      allowEdit: true,
      targetWidth: 500,
      targetHeight: 500,
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.img = 'data:image/jpeg;base64,' + imageData;
      this.userProvider.setImage('data:image/jpeg;base64,' + imageData)
      .then(data=>{
        this.events.publish('user:image');
      });
    }, (err) => {
      // Handle error
    });

  }

}
