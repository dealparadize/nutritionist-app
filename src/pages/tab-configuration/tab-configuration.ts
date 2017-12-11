import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { UserProvider } from "../../providers/user.provider";
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LocalNotifications } from '@ionic-native/local-notifications';
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
	tBtn:any ;
	delay:any = 15;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public userProvider: UserProvider,
		public camera: Camera,
		public events: Events,
		public localNotifications: LocalNotifications
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
				console.log(data.user.userconfig.aceptNotification);
				this.tBtn=data.user.userconfig.aceptNotification;
				//console.log(this.user)
				this.userProvider.getUserData(this.user._id)
					.do(res => console.log())
					.map(res => res.json())
					.subscribe(data => {
						console.log(data.paciente[0]);	
						this.tBtn=data.paciente[0].userconfig.aceptNotification;			
					});		
			})
			
		
		this.userProvider.getImage()
			.then(data => {
				this.img = data;
			});
	}
	changeState() {
		console.log(this.delay);
		console.log(this.tBtn);
		console.log(this.user._id);
		let obj = {
			"paciente": {
				"userconfig": {
					"timeBefore": this.delay,
					"aceptNotification": this.tBtn
				}
			}
		}
		this.userProvider.updateNotificationState(this.user._id,obj)
		.do(res => console.log())
		.map(res => res.json())
		.subscribe(data => {
			if(!this.tBtn){
				this.localNotifications.cancelAll();
				this.localNotifications.clearAll();
			}
		})	
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
				.then(data => {
					this.events.publish('user:image');
				});
		}, (err) => {
			// Handle error
		});

	}

}
